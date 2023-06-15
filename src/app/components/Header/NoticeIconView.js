import React, { useRef, useState } from 'react';
import { Button, Modal, Table, Tag } from 'antd';
import NoticeIcon from '../NoticeIcon';
import './index.less';
import { io } from 'socket.io-client';
import Notification from '@components/Notification/Notification';
import { connect } from 'react-redux';
import * as app from '@app/store/ducks/app.duck';
import * as user from '@app/store/ducks/user.duck';
import * as notification from '@app/store/ducks/notification.duck';
import { deleteNotification, getAllNotification } from '@app/services/Notification';
import { URL } from '@url';
import { CONSTANTS } from '@constants';
import { CloseSquareFilled, EyeOutlined } from '@ant-design/icons';
import moment from 'moment';
import { toast } from '@app/common/functionCommons';
import ActionCell from '@components/ActionCell';
import { useHistory } from 'react-router-dom';
import EVN_LOGO from '@assets/images/logo/EVN-logo.png';

function getObjectLink(doc, workType, congViec) {
  const loaiCongViec = Object.values(workType).find((key) => {
    return key.code === congViec;
  });
  return URL[`${loaiCongViec?.type}_ID`]?.format(doc.payload?._id);
}

function NoticeIconView({ isLoading, myInfo, token, workType, ...props }) {
  const history = useHistory();
  const socket = useRef();
  const [notificationInfo, setNotificationInfo] = useState({});
  const [notificationList, setNotificationList] = useState([]);
  const [desktopNotification, setDesktopNotification] = useState({
    ignore: true,
    title: '',
  });
  const [isShowModal, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };

  function handlePermissionGranted() {
    console.log('Permission Granted');
    setDesktopNotification({ ...desktopNotification, ignore: false });
  }

  function handlePermissionDenied() {
    console.log('Permission Denied');
    setDesktopNotification({ ...desktopNotification, ignore: true });
  }

  function handleNotSupported() {
    console.log('Web Notification not Supported');
    setDesktopNotification({ ...desktopNotification, ignore: true });
  }

  function handleNotificationOnClick(e, tag, notification) {
    e.preventDefault(); // prevent the browser from focusing the Notification's tab
    const link = getObjectLink(notification, workType, notification?.payload?.loai_cong_viec);
    if (notification.status !== 'VIEWED') {
      socket.current.emit('user_viewed_one_notification', { _id: notification._id, user_id: notification.user_id });
    }
    window.open(link, '_blank');
  }

  function handleNotificationOnError(e, tag) {
    console.log(e, 'Notification error tag:' + tag);
  }

  function handleNotificationOnClose(e, tag) {
    console.log(e, 'Notification closed tag:' + tag);
  }

  function handleNotificationOnShow(e, tag) {
    playSound();
    console.log(e, 'Notification shown tag:' + tag);
  }

  function showDesktopNotification(newNotification) {
    if (desktopNotification.ignore || !newNotification) {
      return;
    }
    const now = Date.now();
    const title = newNotification.title ? newNotification.title : 'Thông báo mới';
    const body = newNotification.content;
    const tag = newNotification._id;
    const icon = EVN_LOGO;
    // const icon = 'http://localhost:3000/Notifications_button_24.png';

    // Available options
    // See https://developer.mozilla.org/en-US/docs/Web/API/Notification/Notification
    const options = {
      tag: tag,
      body: body,
      icon: icon,
      data: newNotification,
      lang: 'vi',
      dir: 'ltr',
      // sound: './sound.mp3',  // no browsers supported https://developer.mozilla.org/en/docs/Web/API/notification/sound#Browser_compatibility
    };
    setDesktopNotification({ ...desktopNotification, title: title, options: options });
  }

  function playSound(filename) {
    // document.getElementById('sound').play();
  }

  function createHandler(socket, registerUserDevice) {
    return (payload) => {
      return registerUserDevice(socket, payload);
    };
  }

  function handleViewAll() {
    socket.current.emit('user_viewed_all_notifications', { user_id: myInfo._id, token });
  }

  function handleViewOne(item) {
    const { id, userId, read } = item;
    if (!read) {
      socket.current.emit('user_viewed_one_notification', { _id: id, user_id: userId });
    }
  }

  function handlerNewNotification(socket, notification) {
    showDesktopNotification(notification);
  }

  function handlerNotificationUpdate(socket, notificationInfo) {
    setNotificationInfo(notificationInfo);
    getNotification();
  }

  React.useEffect(() => {
    socket.current = io('/', { 'transports': ['websocket'], path: '/socket' });
  }, []);

  function changeReadState(item) {
    handleViewOne(item);
  }

  function handleNoticeClear() {
    handleViewAll();
  }

  function onNoticeVisibleChange() {

  }

  React.useEffect(() => {
    if (myInfo && myInfo._id) {
      socket.current.emit('user_login_id', { user_id: myInfo._id, token });
      socket.current.on('notification_info', setNotificationInfo);
      socket.current.on('notification_update', createHandler(socket.current, handlerNotificationUpdate));
      socket.current.on('notification_new', createHandler(socket.current, handlerNewNotification));
    }
  }, [myInfo]);

  async function getNotification() {
    const apiResponse = await getAllNotification();
    if (apiResponse) {
      let notiList = [];
      apiResponse.forEach(doc => {
        let link = getObjectLink(doc, workType, doc.payload?.loaiCongViec);
        if (link) {
          notiList.push({
            id: doc._id,
            key: doc._id,
            title: doc.content,
            userId: doc.userId,
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            datetime: doc.thoiGianTao,
            type: 'notification',
            read: doc.status === 'VIEWED',
            notification: doc,
            link,
          });
        }
      });
      if (notiList.length) {
        setNotificationList(notiList);
      }
    }
  }

  React.useEffect(() => {
    if (!workType) {
      props.getWorkType();
    }
    if (Object.keys(workType).length) {
      getNotification();
    }
  }, [workType]);

  async function handleDelete(value) {
    const apiResponse = await deleteNotification(value.id);
    const newNoticeList = notificationList.filter(item => item.id !== apiResponse._id);
    setNotificationList(newNoticeList);
    toast(CONSTANTS.SUCCESS, 'Xóa thông báo thành công');
  }

  function handleOnClickDetail(value) {
    setShowModal(false);
    history.push(value.link);
  }

  const dataSource = notificationList;
  const columns = [
    { title: 'Nội dung thông báo', dataIndex: 'title', width: 250, align: 'center' },
    {
      title: 'Thời gian',
      dataIndex: 'datetime',
      render: value => moment(value).format('DD/MM/YYYY hh:mm'),
      width: 100,
      align: 'center',
    },
    {
      align: 'center',
      render: (value) => {
        return <div>
          <Tag color="blue" className="mb-1 ml-2" onClick={() => handleOnClickDetail(value)}><EyeOutlined/> Chi
            tiết</Tag>

          <ActionCell value={value} handleDelete={handleDelete}/>
        </div>;
      },
      fixed: 'right',
      width: 50,
    },
  ];

  return (
    <div className="right">
      <NoticeIcon
        className="action"
        count={myInfo && notificationInfo?.unread}
        onItemClick={changeReadState}
        loading={isLoading}
        clearText="Đã xem"
        viewMoreText="Xem thêm"
        onClear={handleNoticeClear}
        onPopupVisibleChange={onNoticeVisibleChange}
        onViewMore={showModal}
        clearClose
      >
        <NoticeIcon.Tab
          tabKey="notification"
          count={notificationList.length}
          list={notificationList}
          title="Thông báo"
          emptyText="Không có thông báo"
          showViewMore
        />
      </NoticeIcon>
      <Notification
        ignore={desktopNotification.ignore && desktopNotification.title !== ''}
        notSupported={handleNotSupported}
        onPermissionGranted={handlePermissionGranted}
        onPermissionDenied={handlePermissionDenied}
        onShow={handleNotificationOnShow}
        onClick={handleNotificationOnClick}
        onClose={handleNotificationOnClose}
        onError={handleNotificationOnError}
        timeout={5000}
        title={desktopNotification.title}
        options={desktopNotification.options}
        // disableActiveWindow
        // swRegistration={props.swRegistration}
      />
      <Modal
        className="modal-notice"
        visible={isShowModal}
        width="75%"
        closeIcon={<i className="fa fa-times"/>}
        title="Danh sách thông báo"
        onCancel={() => setShowModal(false)}
        footer={[
          <Button key={1} size="small" type="danger" onClick={() => setShowModal(false)} icon={<CloseSquareFilled/>}>
            Đóng
          </Button>,
        ]}
        forceRender
      >
        <Table
          size="small"
          bordered
          columns={columns}
          dataSource={dataSource}
          pagination={true}
          scroll={{ x: 'max-content' }}
        />
      </Modal>
    </div>

  );
}

function mapStateToProps(store) {
  const { myInfo } = store.user;
  const { isLoading, token, workType } = store.app;
  const { notificationList } = store.notification;
  return { isLoading, myInfo, token, notificationList, workType };
}

export default (connect(mapStateToProps, { ...app.actions, ...user.actions, ...notification.actions })(NoticeIconView));
