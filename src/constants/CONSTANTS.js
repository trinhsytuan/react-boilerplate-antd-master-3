import React from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';
import moment from 'moment';

export const WEB_VERSION = '2021/22/11/13/42';

export const SIDER_WIDTH = 270;

export const CONSTANTS = {
  USER_NAME_ADDON: '1npt\\',
  LANG_VI: 'vi',
  LANG_EN: 'en',
  LANH_DAO: 'LANH_DAO',
  NGUOI_CHO_PHEP: 'NGUOI_CHO_PHEP',
  GIAM_SAT_AN_TOAN: 'GIAM_SAT_AN_TOAN',
  IN: 'IN',
  OUT: 'OUT',
  TERRAIN: 'TERRAIN',
  SATELLITE: 'SATELLITE',
  ANDROID: 'ANDROID',
  IOS: 'IOS',
  BARS: 'BARS',
  PREV: 'PREV',
  NEXT: 'NEXT',
  BIEN_PHAP: 'BIEN_PHAP',
  DIEU_KIEN: 'DIEU_KIEN',
  HIDDEN: 'HIDDEN',
  INITIAL: 'INITIAL',
  GET: 'GET',
  PUT: 'PUT',
  POST: 'POST',
  LOGIN: 'LOGIN',
  DEFAULT: 'DEFAULT',
  ALL: 'ALL',
  READ: 'READ',
  DELETE: 'DELETE',
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  REMOVE: 'REMOVE',
  SAVE: 'SAVE',
  CONFIRM: 'CONFIRM',
  CANCEL: 'CANCEL',
  CLOSE: 'CLOSE',

  TEXT: 'TEXT',
  NUMBER: 'NUMBER',
  YEAR: 'YEAR',
  DATE: 'DATE',
  TIME: 'TIME',
  DATE_TIME: 'DATE_TIME',
  TIME_DATE: 'TIME_DATE',
  FORMAT_DATE: 'DD/MM/YYYY',
  FORMAT_DATE_TIME: 'DD/MM/YYYY HH:mm',
  FORMAT_TIME_DATE: 'HH:mm DD/MM/YYYY',
  INPUT: 'INPUT',
  CHECK_BOX: 'CHECK_BOX',
  SELECT: 'SELECT',
  MULTI_SELECT: 'MULTI_SELECT',
  TEXT_AREA: 'TEXT_AREA',
  SELECT_MULTI: 'SELECT_MULTI',
  PASSWORD: 'PASSWORD',
  SWITCH: 'SWITCH',
  LABEL: 'LABEL',
  SELECT_LABEL: 'SELECT_LABEL',
  TREE_SELECT: 'TREE_SELECT',
  FILE: 'FILE',
  ONE_DAY: 'ONE_DAY',

  DESTROY: 'DESTROY',
  SUCCESS: 'SUCCESS',
  ERROR: 'ERROR',
  INFO: 'INFO',
  WARNING: 'WARNING',

  CHAIRMAN: 'CHAIRMAN',
  MEMBER: 'MEMBER',

  NOT_IN: 'NOT_IN',
  NOT_UPLOADED: 'NOT_UPLOADED',
  UPLOADING: 'UPLOADING',
  UPLOADED: 'UPLOADED',
  UPLOAD_ERROR: 'UPLOAD_ERROR',

  NOT_FOUND: 'NOT_FOUND',
  STATUS_ACTIVE_VI: 'Vận hành',
  RECTANGLE: 'RECTANGLE',
  POLYGON: 'POLYGON',
  POINT_SIZE: 8,
  KIEM_TRA: 'KIEM_TRA',
  SUA_CHUA_BAO_DUONG: 'SUA_CHUA_BAO_DUONG',
  DO_THONG_SO: 'DO_THONG_SO',
  DO_DIEN_TRO_TIEP_DIA: 'DO_DIEN_TRO_TIEP_DIA',
  DO_NHIET_DO_TIEP_XUC: 'DO_NHIET_DO_TIEP_XUC',
  DO_KHOANG_CACH_PHA_DAT: 'DO_KHOANG_CACH_PHA_DAT',
  CONG_TAC_PHU_TRO: 'CONG_TAC_PHU_TRO',
  CHUA_PHAN_LOAI: 'CHUA_PHAN_LOAI',

  KHONG_DAT: 'KHONG_DAT',
  DAT: 'DAT',
  DUONG_DAY: 'DuongDay',
  COT_DIEN: 'CotDien',
  TBA: 'Tba',
  PERMISSION_DEFAULT: {
    create: false,
    delete: false,
    update: false,
  },
  ORG_UNIT_TREE: 'ORG_UNIT_TREE',
  PHIEU_CONG_TAC: 'PHIEU_CONG_TAC',

  VI_TRI: 'VI_TRI',
  KHOANG_COT: 'KHOANG_COT',

  TONG_CONG_TY: 'TONG_CONG_TY',
  CONG_TY: 'CONG_TY',
  TRUYEN_TAI_DIEN: 'TRUYEN_TAI_DIEN',
  DOI_TRUYEN_TAI_DIEN: 'DOI_TRUYEN_TAI_DIEN',
  DOWNLOAD_COLOR: '#9900CC',
  CASCADER_JOIN: ' > ',
  START: 'START',
  END: 'END',
  LOCK: 'LOCK',
  CAT_DIEN: 'CAT_DIEN',
  TIEP_DAT: 'TIEP_DAT',
  RAO_CHAN: 'RAO_CHAN',
  COMPLETE: 'COMPLETE',
  PROCESSING: 'PROCESSING',
  PROCESSED: 'PROCESSED',
  POPULATE: 'populate',
};

export const PAGINATION_INIT = Object.assign({}, {
  docs: [],
  currentPage: 1,
  pageSize: 10,
  totalDocs: 0,
  query: {},
});
export const TOKEN_EXP_TIME = 1000 * 5 * 60;


export const GENDER_OPTIONS = [
  { label: 'Nam', value: 'MALE' },
  { label: 'Nữ', value: 'FEMALE' },
  { label: 'Khác', value: 'OTHER' },
];

export const THOI_GIAN_FILTER = [
  { label: 'Tháng hiện tại', value: 'MONTH', fromDate: moment().startOf('month'), toDate: moment() },
  { label: 'Quý hiện tại', value: 'QUARTER', fromDate: moment().startOf('quarter'), toDate: moment() },
  { label: 'Năm hiện tại', value: 'YEAR', fromDate: moment().startOf('year'), toDate: moment() },
  { label: 'Tùy chọn', value: 'OTHER' },
];

export const ERR_FILTER = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Dữ liệu không hợp lệ', value: 'ERR' },
  { label: 'Dữ liệu hợp lệ', value: 'NO_ERR' },
];

export const TOAST_MESSAGE = {
  SUCCESS: {
    DEFAULT: 'Thành công',
  },
  ERROR: {
    DEFAULT: 'Có lỗi xảy ra. Vui lòng liên hệ quản trị viên',
    LOGIN: 'Có lỗi trong quá trình đăng nhập',
    GET: 'Có lỗi trong quá trình lấy dữ liệu',
    POST: 'Có lỗi trong quá trình tạo mới',
    PUT: 'Có lỗi trong quá trình cập nhật',
    DELETE: 'Có lỗi trong quá trình xoá dữ liệu',
    DESCRIPTION: 'Vui lòng kiểm tra và thử lại',
  },
  ICON: {
    SUCCESS: <CheckCircleOutlined className="float-left" style={{ fontSize: '24px', color: '#fff' }}/>,
    ERROR: <CloseCircleOutlined className="float-left" style={{ fontSize: '24px', color: '#fff' }}/>,
    INFO: <InfoCircleOutlined className="float-left" style={{ fontSize: '24px', color: '#fff' }}/>,
    WARNING: <WarningOutlined className="float-left" style={{ fontSize: '24px', color: '#fff' }}/>,
  },
};

export const RULES = {
  REQUIRED: { required: true, message: 'Không được để trống' },
  NUMBER: { pattern: '^[0-9]+$', message: 'Không phải là số' },
  PHONE: { pattern: '^[0-9]+$', len: 10, message: 'Số điện thoại không hợp lệ' },
  CMND: { required: true, pattern: '^[0-9]+$', message: 'Số CMND/CCCD không hợp lệ' },
  EMAIL: { type: 'email', message: 'Email không hợp lệ' },
  NUMBER_FLOAT: {
    pattern: new RegExp('^[- +]?[0-9]+[.]?[0-9]*([eE][-+]?[0-9]+)?$'),
    message: 'Không phải là số',
  },
  PASSWORD_FORMAT: {
    pattern: new RegExp('^(?=.*[a-z])(?=.*[0-9])(?!.* )(?=.{6,14})'),
    message: 'Mật khẩu phải có ít nhất một chữ cái và một chữ số, độ dài 6 đến 14 ký tự và không có khoảng trắng',
  },
  USERNAME_RANGER: {
    pattern: new RegExp('^([a-zA-Z0-9_-]){6,32}$'),
    message: 'Tên tài khoản chỉ chấp nhận độ dài 6 đến 32 ký tự',
  },
  USERNAME_LENGTH: {
    pattern: new RegExp('^(?!.* )(?=.{6,32})'),
    message: 'Tên tài khoản chỉ chấp nhận độ dài 6 đến 32 ký tự và không có khoảng trắng',
  },
};

export const PAGINATION_CONFIG = Object.assign(
  {},
  {
    pageSizeOptions: ['1', '10', '20', '50'],
    showSizeChanger: true,
    showTotal: (total, range) => `${range[0]}-${range[1]} của ${total}`,
  },
);

export const PAGINATION_MODAL = Object.assign(
  {},
  PAGINATION_CONFIG,
  {
    pageSizeOptions: [5, 10, 15],
    defaultPageSize: 5,
  },
);

export const ORG_UNIT_TYPE = {
  TONG_CONG_TY: { level: 1, label: 'Tổng công ty', value: 'TONG_CONG_TY', parentKey: null },
  CONG_TY: { level: 2, label: 'Công ty', value: 'CONG_TY', parentKey: 'TONG_CONG_TY' },
  TRUYEN_TAI_DIEN: { level: 3, label: 'Truyền tải điện', value: 'TRUYEN_TAI_DIEN', parentKey: 'CONG_TY' },
  DOI_TRUYEN_TAI_DIEN: {
    level: 4,
    label: 'Đội truyền tải điện',
    value: 'DOI_TRUYEN_TAI_DIEN',
    parentKey: 'TRUYEN_TAI_DIEN',
  },
};

export const ACTIVE_STATUS = [
  { label: 'Vận hành', value: 'Vận hành' },
  { label: 'Đang xây dựng', value: 'Đang xây dựng' },
];


export const TRANG_THAI_HOAN_THANH = {
  DA_HOAN_THANH: 'DA_HOAN_THANH',
  CHUA_HOAN_THANH: 'CHUA_HOAN_THANH',
};

export const TRANG_THAI_HOAN_THANH_OPTIONS = [
  { code: TRANG_THAI_HOAN_THANH.DA_HOAN_THANH, label: 'Đã hoàn thành', color: '#13c2c2' },
  { code: TRANG_THAI_HOAN_THANH.CHUA_HOAN_THANH, label: 'Chưa hoàn thành', color: '#fa8c16' },
];

export const TINH_TRANG = {
  BINH_THUONG: { label: 'Bình thường', value: 'BINH_THUONG', color: '#52c41a' },
  BAT_THUONG: { label: 'Không bình thường', value: 'BAT_THUONG', color: '#fa8c16' },
};

export const TRANG_THAI_OPTIONS = [
  { label: 'Tất cả', value: 'ALL', color: '#fa541c' },
  { label: 'Đang tạo phiếu', value: 'DANG_TAO_PHIEU', color: '#fa541c' },
  { label: 'Đã huỷ phiếu', value: 'HUY_PHIEU', color: '#1890ff' },
  { label: 'Đã giao phiếu', value: 'GIAO_PHIEU', color: '#fa8c16' },
  { label: 'Đã nhận phiếu', value: 'TIEP_NHAN', color: '#722ed1' },
  { label: 'Đã từ chối nhận phiếu', value: 'TU_CHOI_NHAN', color: '#52c41a' },
  { label: 'Đã trả phiếu', value: 'KHOA_PHIEU', color: '#13c2c2' },
  { label: 'Đã từ chối xác nhận khoá phiếu', value: 'TU_CHOI_KHOA', color: '#13c2c2' },
  { label: 'Đã xác nhận khoá phiếu', value: 'XAC_NHAN_KHOA', color: '#13c2c2' },
];


export const LOAI_CONG_VIEC_OPTIONS = [
  { label: 'Tất cả', value: 'ALL' },
  { label: 'Kiểm tra', value: 'KIEM_TRA' },
  { label: 'Sửa chữa bảo dưỡng', value: 'SUA_CHUA_BAO_DUONG' },
  { label: 'Đo thông số', value: 'DO_THONG_SO' },
  { label: 'Công tác phụ trợ', value: 'CONG_TAC_PHU_TRO' },
];

function createRecord(code, name, type) {
  return { code, name, type };
}

export const KIEM_TRA = 'KIEM_TRA';
export const SUA_CHUA_BAO_DUONG = 'SUA_CHUA_BAO_DUONG';
export const DO_THONG_SO = 'DO_THONG_SO';
export const CONG_TAC_PHU_TRO = 'CONG_TAC_PHU_TRO';

export const LOAI_CONG_VIEC = {
  KIEM_TRA_DINH_KY_NGAY: createRecord('KIEM_TRA_DINH_KY_NGAY', 'Kiểm tra định kỳ ngày', KIEM_TRA),
  KIEM_TRA_DINH_KY_DEM: createRecord('KIEM_TRA_DINH_KY_DEM', 'Kiểm tra định kỳ đêm', KIEM_TRA),
  KIEM_TRA_SU_CO: createRecord('KIEM_TRA_SU_CO', 'Kiểm tra sự cố', KIEM_TRA),
  KIEM_TRA_DOT_XUAT: createRecord('KIEM_TRA_DOT_XUAT', 'Kiểm tra đột xuất', KIEM_TRA),
  KIEM_TRA_CHUYEN_DE: createRecord('KIEM_TRA_CHUYEN_DE', 'Kiểm tra chuyên đề', KIEM_TRA),

  CO_KE_HOACH: createRecord('CO_KE_HOACH', 'Có kế hoạch', SUA_CHUA_BAO_DUONG),
  KHONG_CO_KE_HOACH: createRecord('KHONG_CO_KE_HOACH', 'Không có kế hoạch', SUA_CHUA_BAO_DUONG),

  DO_DIEN_TRO_TIEP_DIA: createRecord('DO_DIEN_TRO_TIEP_DIA', 'Đo điện trở tiếp địa', DO_THONG_SO),
  DO_NHIET_DO_TIEP_XUC: createRecord('DO_NHIET_DO_TIEP_XUC', 'Đo nhiệt độ tiếp xúc', DO_THONG_SO),
  DO_KHOANG_CACH_PHA_DAT: createRecord('DO_KHOANG_CACH_PHA_DAT', 'Đo khoảng cách pha đất', DO_THONG_SO),
  // DO_KHOANG_CACH_GIAO_CHEO: createRecord('DO_KHOANG_CACH_GIAO_CHEO', 'Đo khoảng cách giao chéo', DO_THONG_SO),
  CONG_TAC_PHU_TRO: createRecord('CONG_TAC_PHU_TRO', 'Công tác phụ trợ', CONG_TAC_PHU_TRO),
};
export const TINH_TRANG_PHIEU = {
  DANG_GIAO_CHAM: { code: 'DANG_GIAO_CHAM', label: 'Đang giao chậm' },
  DA_GIAO_CHAM: { code: 'DA_GIAO_CHAM', label: 'Đã giao chậm' },
  DANG_TIEP_NHAN_CHAM: { code: 'DANG_TIEP_NHAN_CHAM', label: 'Đang tiếp nhận chậm' },
  DA_TIEP_NHAN_CHAM: { code: 'DA_TIEP_NHAN_CHAM', label: 'Đã tiếp nhận chậm' },
  DANG_THUC_HIEN_CHAM: { code: 'DANG_THUC_HIEN_CHAM', label: 'Đang thực hiện chậm' },
  DA_THUC_HIEN_CHAM: { code: 'DA_THUC_HIEN_CHAM', label: 'Đã thực hiện chậm' },
  DANG_XAC_NHAN_KHOA_CHAM: { code: 'DANG_XAC_NHAN_KHOA_CHAM', label: 'Đang xác nhận khóa chậm' },
  DA_XAC_NHAN_KHOA_CHAM: { code: 'DA_XAC_NHAN_KHOA_CHAM', label: 'Đã xác nhận khóa chậm' },
};

export const TRANG_THAI_XU_LY = {
  CHUA_XU_LY: { code: 'CHUA_XU_LY', label: 'Chưa xử lý', color: '#fa541c' },
  DANG_XU_LY: { code: 'DANG_XU_LY', label: 'Đang xử lý', color: '#1890ff' },
  DA_XU_LY: { code: 'DA_XU_LY', label: 'Đã xử lý', color: '#13c2c2' },
};
export const TRANG_THAI_THUC_HIEN = {
  CHUA_THUC_HIEN: { code: 'CHUA_THUC_HIEN', label: 'Chưa thực hiện', color: '#fa541c' },
  DA_THUC_HIEN: { code: 'DA_THUC_HIEN', label: 'Đã thực hiện', color: '#13c2c2' },
};
export const LOAI_NOI_DUNG_KIEM_TRA = {
  KIEM_TRA_VI_TRI: { code: 'KIEM_TRA_VI_TRI', label: 'Kiểm tra vị trí' },
  KIEM_TRA_KHOANG_COT: { code: 'KIEM_TRA_KHOANG_COT', label: 'Kiểm tra khoảng cột' },
};
export const LOAI_CONG_VIEC_SUA_CHUA = {
  SUA_CHUA_VI_TRI: { code: 'SUA_CHUA_VI_TRI', label: 'Sửa chữa vị trí' },
  SUA_CHUA_KHOANG_COT: { code: 'SUA_CHUA_KHOANG_COT', label: 'Sửa chữa khoảng cột' },
};

export const DE_XUAT_XU_LY = {
  XU_LY_TRONG_VAN_HANH: { code: 'XU_LY_TRONG_VAN_HANH', label: 'Xử lý trong vận hành' },
  BAO_CAO_TTD: { code: 'BAO_CAO_TTD', label: 'Báo cáo TTĐ' },
};

export const KE_HOACH_PHE_DUYET = {
  DANG_KY_SCTX: { code: 'DANG_KY_SCTX', label: 'Đăng ký SCTX' },
  DANG_KY_SCL: { code: 'DANG_KY_SCL', label: 'Đăng ký SCL' },
};

export const GIAI_PHAP_XU_LY_PHA_DAT_THAP = {
  THEO_DOI_THUONG_XUYEN: { code: 'THEO_DOI_THUONG_XUYEN', label: 'Theo dõi thường xuyên' },
  LAP_PHUONG_AN: { code: 'LAP_PHUONG_AN', label: 'Lập phương án nâng cao pha – đất' },
};

export const VI_PHAM_QUY_DINH_HANH_LANG_TUYEN = {
  VI_PHAM: { code: 'VI_PHAM', label: 'Vi phạm' },
  KHONG_VI_PHAM: { code: 'KHONG_VI_PHAM', label: 'Không vi phạm' },
};

export const HUONG_DO = {
  PHIA_NHO: { code: 'PHIA_NHO', label: 'Phía cột thứ tự nhỏ' },
  PHIA_LON: { code: 'PHIA_LON', label: 'Phía cột thứ tự lớn' },
};

export const EXTRA_FIELD = {
  User: { code: 'User', label: 'Người dùng' },
  ViTri: { code: 'ViTri', label: 'Vị trí' },
  CongTrinh: { code: 'CongTrinh', label: 'Công trình' },
  DuongDay: { code: 'DuongDay', label: 'Đường dây' },
};

export const KIEU_DU_LIEU = {
  VAN_BAN: { code: 'VAN_BAN', label: 'Văn bản' },
  THOI_GIAN: { code: 'THOI_GIAN', label: 'Thời gian' },
  DANH_SACH: { code: 'DANH_SACH', label: 'Danh sách' },
};

export const TIA_TIEP_DIA = [
  { code: 'tiaSoMot', label: 'Tia số 1' },
  { code: 'tiaSoHai', label: 'Tia số 2' },
  { code: 'tiaSoBa', label: 'Tia số 3' },
  { code: 'tiaSoBon', label: 'Tia số 4' },
  { code: 'tiaSoNam', label: 'Tia số 5' },
  { code: 'tiaSoSau', label: 'Tia số 6' },
  { code: 'tiaSoBay', label: 'Tia số 7' },
  { code: 'tiaSoTam', label: 'Tia số 8' },
  { code: 'tiaSoChin', label: 'Tia số 9' },
  { code: 'tiaSoMuoi', label: 'Tia số 10' },
  { code: 'tiaSoMuoiMot', label: 'Tia số 11' },
  { code: 'tiaSoMuoiHai', label: 'Tia số 12' },
  { code: 'tiaSoMuoiBa', label: 'Tia số 13' },
  { code: 'tiaSoMuoiBon', label: 'Tia số 14' },
  { code: 'tiaSoMuoiNam', label: 'Tia số 15' },
];
export const CAP_HO_SO = {
  CAP_1: { code: 'CAP_1', label: 'Cấp 1' },
  CAP_2: { code: 'CAP_2', label: 'Cấp 2' },
  CAP_3: { code: 'CAP_3', label: 'Cấp 3' },
};

export const CAP_HO_SO_OPTIONS = [
  { code: 'CAP_1', label: 'Cấp 1' },
  { code: 'CAP_2', label: 'Cấp 2' },
  { code: 'CAP_3', label: 'Cấp 3' },
];

export const DOI_TUONG = {
  CONG_TRINH: { code: 'CONG_TRINH', label: 'Công trình' },
  VI_TRI: { code: 'VI_TRI', label: 'Vị trí' },
  DUONG_DAY: { code: 'DUONG_DAY', label: 'Đường dây' },
  KHAC: { code: 'KHAC', label: 'Khác' },
};

export const DOI_TUONG_OPTIONS = [
  { code: 'CONG_TRINH', label: 'Công trình' },
  { code: 'VI_TRI', label: 'Vị trí' },
  { code: 'DUONG_DAY', label: 'Đường dây' },
  { code: 'KHAC', label: 'Khác' },
];



export const LOAI_TAI_KHOAN = {
  TAI_KHOAN_HE_THONG: { code: 'TAI_KHOAN_HE_THONG', value: 'TAI_KHOAN_HE_THONG', label: 'Tài khoản hệ thống' },
  TAI_KHOAN_HRMS: { code: 'TAI_KHOAN_HRMS', value: 'TAI_KHOAN_HRMS', label: 'Tài khoản HRMS' },
};

export const CONSTANTS_MODULE = {
  QUAN_LY_DUONG_DAY: { code: 'QUAN_LY_DUONG_DAY', label: 'Quản lý đường dây' },
  TON_TAI_CONG_TRINH: { code: 'TON_TAI_CONG_TRINH', label: 'Tồn tại công trình xây dựng' },
  TON_TAI_THIET_BI: { code: 'TON_TAI_THIET_BI', label: 'Tồn tại thiết bị' },
};

export const YEU_CAU_TACH_VAN_HANH = {
  CO: { code: 'CO', label: 'Có' },
  KHONG: { code: 'KHONG', label: 'Không' },
};

export const GIAN_DOAN_CUNG_CAP_DIEN = {
  CO: { code: 'CO', label: 'Có' },
  KHONG: { code: 'KHONG', label: 'Không' },
};

export const KET_QUA_XU_LY_KHIEM_KHUYET = {
  DAT: { code: 'DAT', label: 'Đạt' },
  TIEP_TUC_THEO_DOI: { code: 'TIEP_TUC_THEO_DOI', label: 'Tiếp tục theo dõi' },
  TIEP_TUC_XU_LY: { code: 'TIEP_TUC_XU_LY', label: 'Tiếp tục xử lý' },
};

export const CONFIG_THIET_BI = {
  CACH_DIEN: { code: 'CACH_DIEN', label: 'Cách điện', fieldKey: 'cachDienId' },
  DAY_DAN: { code: 'DAY_DAN', label: 'Dây dẫn', fieldKey: 'dayDanId' },
  CHONG_SET: { code: 'CHONG_SET', label: 'Chống sét', fieldKey: 'dayChongSetId' },
  CAP_QUANG: { code: 'CAP_QUANG', label: 'Cáp quang', fieldKey: 'dayCapQuangId' },
  COT_DIEN: { code: 'COT_DIEN', label: 'Cột điện', fieldKey: 'cotDienId' },
  GIAO_CHEO: { code: 'GIAO_CHEO', label: 'Giao chéo', fieldKey: 'giaoCheoId' },
  TIEP_DAT: { code: 'TIEP_DAT', label: 'Tiếp đất', fieldKey: 'tiepDatId' },
};

export const THIET_BI_OPTIONS = [
  { code: 'CACH_DIEN', label: 'Cách điện' },
  { code: 'DAY_DAN', label: 'Dây dẫn' },
  { code: 'CHONG_SET', label: 'Chống sét' },
  { code: 'CAP_QUANG', label: 'Cáp quang' },
  { code: 'COT_DIEN', label: 'Cột điện' },
  { code: 'GIAO_CHEO', label: 'Giao chéo' },
  { code: 'TIEP_DAT', label: 'Tiếp đất' },
];

export const TYPE_TON_TAI_LAM_QUANG = {
  TIEU_CHUAN_QUY_DINH: { code: 'TIEU_CHUAN_QUY_DINH', label: 'Tồn tại không đạt tiêu chuẩn, quy định' },
  KHOI_LUONG_CHUA_HOAN_THANH: { code: 'KHOI_LUONG_CHUA_HOAN_THANH', label: 'Tồn tại khối lượng chưa được hoàn thành' },
};

export const TRANG_THAI_TON_TAI = {
  CHUA_XU_LY: { code: 'CHUA_XU_LY', label: 'Chưa xử lý' },
  DANG_XU_LY: { code: 'DANG_XU_LY', label: 'Đang xử lý' },
  DA_XU_LY: { code: 'DA_XU_LY', label: 'Đã xử lý' },
};

export const GIAI_DOAN_GHI_NHAN = {
  DONG_DIEN: { code: 'DONG_DIEN', label: 'Thời điểm đóng điện' },
  LAM_QUANG: { code: 'LAM_QUANG', label: 'Giai đoạn Lâm Quảng' },
};

export const XAC_NHAN_XU_LY_TON_TAI = {
  DONG_Y: { code: 'DONG_Y', label: 'Đồng ý xác nhận', color: '#13c2c2' },
  TU_CHOI: { code: 'TU_CHOI', label: 'Từ chối xác nhận', color: '#fa8c16' },
};

export const XAC_NHAN_LAM_QUANG = {
  DONVI_QLVH: { code: 'DONVI_QLVH', label: 'Đơn vị quản lý vận hành' },
  BAN_QLDA: { code: 'BAN_QLDA', label: 'Ban quản lý dự án' },
};

export const TYPE_CHECKBOX_LAM_QUANG = {
  VI_TRI: { code: 'VI_TRI', label: 'Vị trí' },
  KHOANG_COT: { code: 'KHOANG_COT', label: 'Khoảng cột' },
  KHOANG_NEO: { code: 'KHOANG_NEO', label: 'Khoảng néo' },
};

export const DON_VI_THUC_HIEN = {
  TRONG_EVN: { code: 'TRONG_EVN', label: 'Đơn vị trong EVNNPT' },
  NGOAI_EVN: { code: 'NGOAI_EVN', label: 'Đơn vị ngoài EVNNPT' },
};

export const LOCATIONS_CHECKED = {
  DA_KIEM_TRA: { code: 'DA_KIEM_TRA', label: 'Số lượng vị trí đã kiểm tra' },
  CHUA_KIEM_TRA: { code: 'CHUA_KIEM_TRA', label: 'Số lượng vị trí chưa kiểm tra' },
};

export const TRANG_THAI_CONG_VIEC = {
  DA_HOAN_THANH: { code: 'DA_HOAN_THANH', label: 'Công việc giao hoàn thành' },
  CHUA_HOAN_THANH: { code: 'CHUA_HOAN_THANH', label: 'Công việc giao chưa hoàn thành' },
};

export const DOI_TUONG_SU_CO = {
  NGOAI_EVN: { code: 'NGOAI_EVN', label: 'Tài sản đơn vị khác ngoài EVNNPT' },
  THUOC_EVN: { code: 'THUOC_EVN', label: 'Tài sản đơn vị khác thuộc EVNNPT' },
  TAI_SAN_DON_VI: { code: 'TAI_SAN_DON_VI', label: 'Tài sản đơn vị' },
};

export const COMMON_FILE_NAME_EXTENSION = [
  'doc', 'docx', 'odt', 'pdf', 'xls', 'xlsx', 'ppt', 'pptx', 'txt',
];

export const IMAGE_FILE_EXTENSION = [
  'jpg', 'jpeg', 'png', 'svg',
];
