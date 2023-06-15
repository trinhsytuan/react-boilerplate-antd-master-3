export const API = {
  LOGIN: '/api/nguoi-dung/login',
  USERS: '/api/nguoi-dung',
  USER_DA_XOA: '/api/nguoi-dung/daxoa',
  USER_DA_XOA_ID: '/api/nguoi-dung/daxoa/{0}',
  USER_ID: '/api/nguoi-dung/{0}',
  MY_INFO: '/api/nguoi-dung/me',
  UPDATE_MY_INFO: '/api/nguoi-dung/info',

  DASHBOARD: '/api/dashboard',
  DASHBOARD_PGV: '/api/dashboard/phieugiaoviec',
  DASHBOARD_CHAM: '/api/dashboard/chamtiendo',
  DASHBOARD_LOCATIONS_CHECKED: '/api/dashboard/locationschecked',
  DASHBOARD_CONG_VIEC_HOAN_THANH: '/api/dashboard/congviechoanthanh',
  DASHBOARD_TONTAI: '/api/dashboard/tontai',

  ORG_UNIT: '/api/don-vi',
  ORG_UNIT_ID: '/api/don-vi/{0}',

  CATEGORIES: '/api/hangmuc',
  CATEGORIES_ID: '/api/hangmuc/{0}',

  LOCATION_TYPE: '/api/loaivitri',
  LOCATION_TYPE_ID: '/api/loaivitri/{0}',

  LOCATION: '/api/vitri',
  VI_TRI_BY_CONG_TRINH_ID: '/api/vitri/congtrinh/{0}',
  LOCATION_ID: '/api/vitri/{0}',
  VI_TRI_GIAO_VIEC_BY_DUONG_DAY_ID: '/api/vitri/giaoviec/duongday/{0}',
  LOCATION_BY_CONSTRUCTION: '/api/congtrinh/{0}/vitri',
  LY_LICH_COT_ID: '/api/vitri/{0}/downloadlylichcot',
  LOCATION_BY_POWER_LINE_ID: '/api/duongday/{0}/vitri',
  LOCATION_BY_ONLY_ONCE_POWER_LINE_ID: '/api/duongday/{0}/vitriwithoutchild',
  GIAO_CHEO_THEO_DUONG_DAY: '/api/duongday/{0}/giaocheo',
  TONG_KE_DUONG_DAY: '/api/duongday/{0}/tongke',
  SU_CO_TREN_DAY: '/api/duongday/sucotrenday',
  DUONG_DAY_CHINH_BY_DON_VI_ID: '/api/duongday/donvi/{0}/duongdaychinh',

  ASSIGN: '/api/phieugiaoviec',
  ASSIGN_ID: '/api/phieugiaoviec/{0}',
  PHIEU_KIEM_TRA: '/api/phieukiemtra',
  PHIEU_KIEM_TRA_ID: '/api/phieukiemtra/{0}',

  PHIEU_DO_LUONG: '/api/phieudoluong',
  PHIEU_DO_LUONG_ID: '/api/phieudoluong/{0}',

  PHIEU_SUA_CHUA: '/api/phieusuachua',
  PHIEU_SUA_CHUA_ID: '/api/phieusuachua/{0}',

  PHIEU_CONG_TAC: '/api/phieucongtac',
  PHIEU_CONG_TAC_ID: '/api/phieucongtac/{0}',
  PHIEU_CONG_TAC_BY_GIAO_VIEC_ID: '/api/phieucongtac/phieugiaoviec/{0}',

  ANH_CONG_TAC: '/api/anhcongtac',

  DIEU_KIEN_TIEN_HANH: '/api/dieukientienhanh',
  DIEU_KIEN_TIEN_HANH_ID: '/api/dieukientienhanh/{0}',

  THU_TUC_CAT_DIEN: '/api/thutuccatdien',
  THU_TUC_CAT_DIEN_ID: '/api/thutuccatdien/{0}',

  THU_TUC_TIEP_DAT: '/api/thutuctiepdat',
  THU_TUC_TIEP_DAT_ID: '/api/thutuctiepdat/{0}',

  THU_TUC_RAO_CHAN_BIEN_BAO: '/api/thutucraochanbienbao',
  THU_TUC_RAO_CHAN_BIEN_BAO_ID: '/api/thutucraochanbienbao/{0}',

  THU_TUC_PHAM_VI_LAM_VIEC: '/api/thutucphamvilamviec',
  THU_TUC_PHAM_VI_LAM_VIEC_ID: '/api/thutucphamvilamviec/{0}',

  THU_TUC_CANH_BAO_CHI_DAN: '/api/thutuccanhbaochidan',
  THU_TUC_CANH_BAO_CHI_DAN_ID: '/api/thutuccanhbaochidan/{0}',

  BIEN_PHAP_AN_TOAN_BO_SUNG: '/api/bienphapantoanbosung',
  BIEN_PHAP_AN_TOAN_BO_SUNG_ID: '/api/bienphapantoanbosung/{0}',

  DANH_SACH_NHAN_VIEN_CONG_TAC: '/api/danhsachnhanviencongtac',
  DANH_SACH_NHAN_VIEN_CONG_TAC_ID: '/api/danhsachnhanviencongtac/{0}',

  CONG_TAC_HANG_NGAY: '/api/congtachangngay',
  CONG_TAC_HANG_NGAY_ID: '/api/congtachangngay/{0}',

  BAN_GIAO: '/api/bangiao',
  BAN_GIAO_ID: '/api/bangiao/{0}',

  PHIEU_CONG_TAC_NGOAI: '/api/phieucongtacngoai',

  PHIEU_CONG_TAC_PHU_TRO: '/api/phieucongtacphutro',

  POWER_LINE_TYPE: '/api/loaiduongday',
  POWER_LINE_TYPE_ID: '/api/loaiduongday/{0}',

  ELECTRIC_POLE: '/api/cotdien',
  ELECTRIC_POLE_ID: '/api/cotdien/{0}',

  ELECTRIC_POLE_TYPE: '/api/loaicot',
  ELECTRIC_POLE_TYPE_ID: '/api/loaicot/{0}',

  FOUNDATION_TYPE: '/api/loaimong',
  FOUNDATION_TYPE_ID: '/api/loaimong/{0}',

  TERRAIN: '/api/diahinh',
  TERRAIN_ID: '/api/diahinh/{0}',

  KHOANG_COT: '/api/khoangcot',
  KHOANG_COT_ID: '/api/khoangcot/{0}',

  DUONG_DAY_CHUNG: '/api/duongdaychung',
  DUONG_DAY_CHUNG_ID: '/api/duongdaychung/{0}',
  POWER_LINE: '/api/duongday',
  DUONG_DAY_TREE: '/api/duongday/tree',
  DUONG_DAY_TREE_DASHBOARD: '/api/duongday/tree/dashboard',
  DUONG_DAY_TREE_DOI_TRUYEN_TAI: '/api/duongday/tree/doitruyentai',
  DUONG_DAY_TREE_HO_SO_VAN_HANH: '/api/duongday/tree/hosovanhanh',
  POWER_LINE_ID: '/api/duongday/{0}',

  CONSTRUCTION: '/api/congtrinh',
  CONG_TRINH_CHINH: '/api/congtrinh/congtrinhchinh',
  CONSTRUCTION_CHUA_BAN_GIAO: '/api/congtrinh/allcongtrinhchuabangiao',
  CONG_TRINH_XAY_DUNG: '/api/congtrinh/xaydung',
  CONSTRUCTION_QUERY: '/api/congtrinh/allcongtrinh?page={0}&limit={1}{2}',
  CONSTRUCTION_ID: '/api/congtrinh/{0}',


  STAFF: '/api/nhanvien',
  STAFF_ID: '/api/nhanvien/{0}',

  PROVINCE: '/api/tinhthanh',
  PROVINCE_ID: '/api/tinhthanh/{0}',

  DISTRICT: '/api/quanhuyen',
  DISTRICT_ID: '/api/quanhuyen/{0}',

  WARD: '/api/phuongxa',
  WARD_ID: '/api/phuongxa/{0}',

  ADMIN_UNIT: '/api/hanhchinh',

  INSULATION: '/api/cachdien',
  INSULATION_ID: '/api/cachdien/{0}',

  WIRE_INSULATION: '/api/cachdiendaydan',
  WIRE_INSULATION_ID: '/api/cachdiendaydan/{0}',

  LIGHTNING_ROD_INSULATION: '/api/cachdiendaychongset',
  LIGHTNING_ROD_INSULATION_ID: '/api/cachdiendaychongset/{0}',

  FIBER_OPTIC_INSULATION: '/api/cachdiencapquang',
  FIBER_OPTIC_INSULATION_ID: '/api/cachdiencapquang/{0}',

  ANTI_VIBRATION: '/api/chongrung',
  ANTI_VIBRATION_ID: '/api/chongrung/{0}',

  WIRE_ANTI_VIBRATION: '/api/chongrungdaydan',
  WIRE_ANTI_VIBRATION_ID: '/api/chongrungdaydan/{0}',

  LIGHTNING_ROD_ANTI_VIBRATION: '/api/chongrungdaychongset',
  LIGHTNING_ROD_ANTI_VIBRATION_ID: '/api/chongrungdaychongset/{0}',

  FIBER_OPTIC_ANTI_VIBRATION: '/api/chongrungcapquang',
  FIBER_OPTIC_ANTI_VIBRATION_ID: '/api/chongrungcapquang/{0}',

  EARTHING: '/api/tiepdat',
  EARTHING_ID: '/api/tiepdat/{0}',

  OPERATE: '/api/vanhanh',
  OPERATE_ID: '/api/vanhanh/{0}',

  EARTHING_TYPE: '/api/loaitiepdat',
  EARTHING_TYPE_ID: '/api/loaitiepdat/{0}',

  CROSS_OVER_TYPE: '/api/loaigiaocheo',
  CROSS_OVER_TYPE_ID: '/api/loaigiaocheo/{0}',

  CROSS_OVER: '/api/giaocheo',
  CROSS_OVER_ID: '/api/giaocheo/{0}',

  BOLTS: '/api/bulong',
  BOLTS_ID: '/api/bulong/{0}',

  CONG_VIEC: '/api/danhmuccongviec',
  CONG_VIEC_ID: '/api/danhmuccongviec/{0}',

  DANH_MUC_CONG_VIEC_PHU_TRO: '/api/danhmuccongviecphutro',
  DANH_MUC_CONG_VIEC_PHU_TRO_ID: '/api/danhmuccongviecphutro/{0}',

  WIRE: '/api/daydan',
  WIRE_ID: '/api/daydan/{0}',

  FIBER_OPTIC: '/api/daycapquang',
  FIBER_OPTIC_ID: '/api/daycapquang/{0}',

  FIBER_OPTIC_TYPE: '/api/loaidaycapquang',
  FIBER_OPTIC_TYPE_ID: '/api/loaidaycapquang/{0}',

  LIGHTNING_ROD: '/api/daychongset',
  LIGHTNING_ROD_ID: '/api/daychongset/{0}',

  LIGHTNING_ROD_TYPE: '/api/loaidaychongset',
  LIGHTNING_ROD_TYPE_ID: '/api/loaidaychongset/{0}',

  FRAME: '/api/khungdinhvi',
  FRAME_ID: '/api/khungdinhvi/{0}',

  NGUOI_CONG_TAC: '/api/nguoicongtac',
  NGUOI_CONG_TAC_ID: '/api/nguoicongtac/{0}',

  COUNTER_WEIGHT: '/api/tabu',
  COUNTER_WEIGHT_ID: '/api/tabu/{0}',

  KET_QUA_XU_LY: '/api/ketquaxuly',
  KET_QUA_XU_LY_ID: '/api/ketquaxuly/{0}',

  KET_QUA_KIEM_TRA: '/api/ketquakiemtra',
  KET_QUA_KIEM_TRA_ID: '/api/ketquakiemtra/{0}',

  KET_QUA_CONG_VIEC_PHU_TRO: '/api/congviecphutro',
  KET_QUA_CONG_VIEC_PHU_TRO_ID: '/api/congviecphutro/{0}',

  CONG_VIEC_PHAT_SINH: '/api/congviecphatsinh',
  CONG_VIEC_PHAT_SINH_ID: '/api/congviecphatsinh/{0}',

  TINH_HINH_TON_TAI: '/api/tinhhinhtontai',
  TINH_HINH_TON_TAI_ID: '/api/tinhhinhtontai/{0}',

  HIEU_CHINH_TON_TAI: '/api/hieuchinhtontai',
  HIEU_CHINH_TON_TAI_ID: '/api/hieuchinhtontai/{0}',

  ANH_VI_TRI: '/api/anhvitri',
  ANH_VI_TRI_ID: '/api/anhvitri/{0}',

  THIET_BI: '/api/thietbiphathien',
  THIET_BI_ID: '/api/thietbiphathien/{0}',

  BAT_THUONG: '/api/batthuongphathien',
  BAT_THUONG_ID: '/api/batthuongphathien/{0}',

  FILE: '/api/file',
  FILE_ID: '/api/file/{0}',
  FILE_NAME_ID: '/api/file/?id={0}&file_name={1}',
  PREVIEW_ID: '/api/file/preview/{0}',
  IOS_APP: '/api/file/iosapp',
  ANDROID_APP: '/api/file/androidapp',

  UPLOAD_LOCATION: '/api/thietbi/import',
  CHECK_IMPORT: '/api/thietbi/checkimport',
  CHECK_IMPORT_BY_DATA: '/api/thietbi/checkimportbydata',
  IMPORT_ONE: '/api/thietbi/importone',
  IMPORT_MANY: '/api/thietbi/importmany',

  UPLOAD_CONSTRUCTION: '/api/importcongtrinh/import',
  CHECK_IMPORT_CONSTRUCTION: '/api/importcongtrinh/checkimport',
  CHECK_IMPORT_BY_DATA_CONSTRUCTION: '/api/importcongtrinh/checkimportbydata',
  IMPORT_ONE_CONSTRUCTION: '/api/importcongtrinh/importone',
  IMPORT_MANY_CONSTRUCTION: '/api/importcongtrinh/importmany',

  UPLOAD_POWER_LINE: '/api/importduongday/import',
  CHECK_IMPORT_POWER_LINE: '/api/importduongday/checkimport',
  CHECK_IMPORT_BY_DATA_POWER_LINE: '/api/importduongday/checkimportbydata',
  IMPORT_ONE_POWER_LINE: '/api/importduongday/importone',
  IMPORT_MANY_POWER_LINE: '/api/importduongday/importmany',

  CRITERION_ID: '/api/tieuchidanhgia/{0}',
  CRITERION: '/api/tieuchidanhgia',

  CHECKLIST: '/api/noidungkiemtra',
  CHECKLIST_ID: '/api/noidungkiemtra/{0}',

  VAN_HANH: '/api/vanhanh',
  VAN_HANH_DASHBOARD: '/api/vanhanh/dashboard',

  DM_THIET_BI: '/api/danhmucthietbi',
  DM_THIET_BI_ID: '/api/danhmucthietbi/{0}',

  ASSIGN_STATUS: '/api/trangthaiphieugiaoviec',

  ROLE: '/api/role',
  ROLE_ID: '/api/role/{0}',

  DETAIL: '/api/noidungdanhgia',
  DETAIL_ID: '/api/noidungdanhgia/{0}',

  MAY_DO: '/api/maydo',
  MAY_DO_ID: '/api/maydo/{0}',

  PHAN_BO_MAY_DO: '/api/phanbomaydo',
  PHAN_BO_MAY_DO_ID: '/api/phanbomaydo/{0}',

  BIEN_PHAP_AN_TOAN: '/api/bienphapantoan',
  BIEN_PHAP_AN_TOAN_ID: '/api/bienphapantoan/{0}',

  DO_DIEN_TRO: '/api/dodientro',
  DO_DIEN_TRO_ID: '/api/dodientro/{0}',
  CREATE_OR_UPDATE_DO_DIEN_TRO: '/api/dodientro/createorupdate',

  DO_PHA_DAT: '/api/dokhoangcachphadat',
  DO_PHA_DAT_ID: '/api/dokhoangcachphadat/{0}',
  CREATE_OR_UPDATE_DO_PHA_DAT: '/api/dokhoangcachphadat/createorupdate',

  CHI_TIET_DO_NHIET_DO: '/api/chitietdonhietdo',
  CHI_TIET_DO_NHIET_DO_ID: '/api/chitietdonhietdo/{0}',

  KET_QUA_DO_NHIET_DO: '/api/ketquadonhietdo',
  KET_QUA_DO_NHIET_DO_ID: '/api/ketquadonhietdo/{0}',
  KET_QUA_DO_NHIET_DO_BY_PHIEU_GIAO_VIEC: '/api/ketquadonhietdo/phieugiaoviec/{0}',
  KET_QUA_DO_NHIET_DO_BY_DUONG_DAY: '/api/ketquadonhietdo/duongday/?duong_day_id={0}',
  REPORT_BIEU_MAU_DO_NHIET_DO: '/api/ketquadonhietdo/download/?duong_day_id={0}',

  DO_NHIET_DO: '/api/donhietdo',
  DO_NHIET_DO_ID: '/api/donhietdo/{0}',

  PHIEU_DO_NHIET_DO: '/api/phieudonhietdo',
  PHIEU_DO_NHIET_DO_ID: '/api/phieudonhietdo/{0}',


  DIEU_KIEN_AN_TOAN: '/api/dieukienantoan',
  DIEU_KIEN_AN_TOAN_ID: '/api/dieukienantoan/{0}',

  SETTING: '/api/cai-dat-he-thong',
  SETTING_ID: '/api/cai-dat-he-thong/{0}',

  SETTING_ANDROID_APP: '/api/cai-dat-he-thong/androidapp',
  SETTING_IOS_APP: '/api/cai-dat-he-thong/iosapp',

  CAI_DAT_VAN_HANH: '/api/caidatvanhanh',
  CAI_DAT_VAN_HANH_ID: '/api/caidatvanhanh/{0}',

  TRUONG_DU_LIEU: '/api/truongdulieu',
  TRUONG_DU_LIEU_ID: '/api/truongdulieu/{0}',

  CAI_DAT_AI: '/api/caidatai',

  TAI_LIEU: '/api/tailieu',
  TAI_LIEU_BY_DUONG_DAY: '/api/tailieu/duongday',
  TAI_LIEU_ID: '/api/tailieu/{0}',
  UPLOAD_TAI_LIEU: '/api/filetailieu/upload',
  FILE_TAI_LIEU: '/api/filetailieu',
  FILE_TAI_LIEU_ID: '/api/filetailieu/{0}',
  HO_SO_THIET_BI: '/api/hosothietbi',
  HO_SO_THIET_BI_ID: '/api/hosothietbi/{0}',
  SU_CO_DUONG_DAY: '/api/sucoduongday',
  SU_CO_DUONG_DAY_ID: '/api/sucoduongday/{0}',
  THONG_TIN_QUAN_LY: '/api/thongtinquanly',
  THONG_TIN_QUAN_LY_ID: '/api/thongtinquanly/{0}',
  TON_TAI_CAP_TREN: '/api/tontaicaptren',
  TON_TAI_CAP_TREN_ID: '/api/tontaicaptren/{0}',

  DRONE: '/api/drone',
  DRONE_ID: '/api/drone/{0}',
  DRONE_CATEGORY: '/api/danhmucdrone',
  DRONE_CATEGORY_ID: '/api/danhmucdrone/{0}',

  USER_RESET_PASSWORD: '/api/nguoi-dung/reset-password',
  USER_CHANGE_PASSWORD: '/api/nguoi-dung/change-password',
  USER_FORGET_PASSWORD: '/api/nguoi-dung/forgot-password-mail',

  NOTIFICATION: '/api/notification',
  NOTIFICATION_ID: '/api/notification/{0}',

  WORK_TYPE: '/api/loaicongviec',

  REPORT_PHIEUGIAOVIEC: '/api/report/baocaophieugiaoviec/{0}',
  REPORT_CHAMTIENDO: '/api/report/baocaochamtiendo/{0}',
  REPORT_KHOA_PHIEUKIEMTRA_DOCX: '/api/report/khoaphieukiemtradocx/?id={0}',
  REPORT_KHOA_PHIEUKIEMTRA_PDF: '/api/report/khoaphieukiemtrapdf/?id={0}',
  REPORT_XACNHANKHOA_PHIEUKIEMTRA_DOCX: '/api/report/xacnhankhoaphieukiemtradocx/?id={0}',
  REPORT_XACNHANKHOA_PHIEUKIEMTRA_PDF: '/api/report/xacnhankhoaphieukiemtrapdf/?id={0}',
  REPORT_PHIEU_SUACHUA_DOCX: '/api/report/phieusuachuabaoduongdocx/?id={0}&type={1}',
  REPORT_PHIEU_SUACHUA_PDF: '/api/report/phieusuachuabaoduongpdf/?id={0}&type={1}',
  REPORT_PHIEU_CONG_VIEC_PHU_TRO_DOCX: '/api/report/phieucongviecphutrodocx/?id={0}&type={1}',
  REPORT_PHIEU_CONG_VIEC_PHU_TRO_PDF: '/api/report/phieucongviecphutropdf/?id={0}&type={1}',
  REPORT_PHIEU_DODIENTRO_XLSX: '/api/report/phieudodientroxlsx/?id={0}',
  REPORT_PHIEU_DODIENTRO_PDF: '/api/report/phieudodientropdf/?id={0}',
  REPORT_PHIEU_DONHIETDO_XLSX: '/api/report/phieudonhietdoxlsx/?id={0}',
  REPORT_PHIEU_DONHIETDO_PDF: '/api/report/phieudonhietdopdf/?id={0}',
  REPORT_PHIEU_DOPHADAT_DOCX: '/api/report/phieudophadatdocx/?id={0}',
  REPORT_PHIEU_DOPHADAT_PDF: '/api/report/phieudophadatpdf/?id={0}',
  REPORT_PHIEUGIAO_CONGVIEC_DOCX: '/api/report/phieugiaodakydocx/?id={0}',
  REPORT_PHIEUGIAO_CONGVIEC_PDF: '/api/report/phieugiaodakypdf/?id={0}',
  REPORT_TIEPNHAN_CONGVIEC_DOCX: '/api/report/phieutiepnhandakydocx/?id={0}',
  REPORT_TIEPNHAN_CONGVIEC_PDF: '/api/report/phieutiepnhandakypdf/?id={0}',
  DOWNLOAD_PHIEU_CONG_TAC_DOCX: '/api/report/phieucongtacdocx/?id={0}',
  DOWNLOAD_PHIEU_CONG_TAC_PDF: '/api/report/phieucongtacpdf/?id={0}',

  LY_LICH_COT: '/api/report/lylichcot/?id={0}',
  DANH_SACH_CONG_VIEC_THEO_VI_TRI: '/api/report/congviectheovitri/{0}',
  REPORT_DANH_SACH_CONG_VIEC_THEO_VI_TRI: '/api/report/congviectheovitri/download/{0}',
  REPORT_NANGSUAT_LAMVIEC: '/api/baocaonangsuat/{0}',
  REPORT_NANGSUAT_LAMVIEC_ID: '/api/baocaonangsuat/taixuong/{0}',
  BIEU_MAU_DIA_PHUONG: '/api/report/diaphuong/?id={0}',
  BIEU_MAU_DO_DIEN_TRO: '/api/dodientro/duongday/{0}',
  REPORT_BIEU_MAU_DO_DIEN_TRO: '/api/dodientro/download/{0}',
  BIEU_MAU_DO_PHA_DAT: '/api/dokhoangcachphadat/duongday/{0}',
  REPORT_BIEU_MAU_DO_PHA_DAT: '/api/dokhoangcachphadat/download/{0}',
  BIEU_MAU_THEO_DOI_SUA_CHUA: '/api/ketquasuachuacokehoach/duongday/{0}',
  REPORT_BIEU_MAU_THEO_DOI_SUA_CHUA: '/api/ketquasuachuacokehoach/download/{0}',
  BIEU_MAU_GIAO_CHEO: '/api/report/giaocheo/?id={0}',
  BIEU_MAU_TONG_KE_DUONG_DAY: '/api/report/tongke/?id={0}',
  REPORT_NHAT_KY_VAN_HANH_DOI_TTD: '/api/report/nhatkyvanhanh/{0}',
  NHAT_KY_VAN_HANH_DOI_TTD: '/api/report/allnhatkyvanhanh/?don_vi_id={0}',
  NHAT_KY_VAN_HANH_DOI_TTD_TEST: '/api/report/allnhatkyvanhanh/{0}',
  CHECKED_BY_DRONE: '/api/report/checkedbydrone/{0}',
  REPORT_CHECKED_BY_DRONE: '/api/report/downloadcheckedbydrone/{0}',
  HANH_LANG_TUYEN: '/api/hanhlangtuyen',
  HANH_LANG_TUYEN_ID: '/api/hanhlangtuyen/{0}',
  CREATE_OR_UPDATE_HANH_LANG_TUYEN: '/api/hanhlangtuyen/createorupdate',
  REPORT_HANH_LANG_TUYEN: '/api/hanhlangtuyen/download/?id={0}',

  TONG_KE_MOI_NOI: '/api/tongkemoinoi',
  TONG_KE_MOI_NOI_ID: '/api/tongkemoinoi/{0}',
  REPORT_TONG_KE_MOI_NOI: '/api/tongkemoinoi/download/?id={0}',

  TAP_TIN: '/api/taptin',
  TAP_TIN_PHUONG_AN_THUC_HIEN: '/api/taptin/phuonganthuchien',
  TAP_TIN_PHUONG_AN_THUC_HIEN_ID: '/api/taptin/phuonganthuchien/{0}',

  TON_TAI: '/api/tontai',
  TON_TAI_ID: '/api/tontai/{0}',
  BIEU_MAU_TON_TAI: '/api/tontai/download',
  TON_TAI_CHUA_XU_LY_BY_DON_VI_ID: '/api/tontai/donvi/{0}/chuaxuly',
  TON_TAI_KHIEM_KHUYET_THIET_BI: '/api/tontai/khiemkhuyetthietbi',
  DOI_TRUYEN_TAI_DE_XUAT: '/api/tontai/{0}/doitruyentaidexuat',
  TRUYEN_TAI_DIEN_DE_XUAT: '/api/tontai/{0}/truyentaidiendexuat',

  KET_QUA_SUA_CHUA_CO_KE_HOACH: '/api/ketquasuachuacokehoach',
  KET_QUA_SUA_CHUA_CO_KE_HOACH_ID: '/api/ketquasuachuacokehoach/{0}',

  NHOM_THIETBI_DUNGCU: '/api/nhomthietbidungcu',
  NHOM_THIETBI_DUNGCU_ID: '/api/nhomthietbidungcu/{0}',
  THIETBI_DUNGCU: '/api/thietbidungcu',
  THIETBI_DUNGCU_ID: '/api/thietbidungcu/{0}',
  SO_THEO_DOI_THIET_BI: '/api/sotheodoithietbi',
  SO_THEO_DOI_THIET_BI_ID: '/api/sotheodoithietbi/{0}',
  REPORT_SO_THEO_DOI_THIET_BI: '/api/sotheodoithietbi/download',

  HO_SO: '/api/hoso',
  HO_SO_TREE: '/api/hoso/tree',
  HO_SO_ID: '/api/hoso/{0}',
  LINK_FILE: '/api/linkfile',
  LINK_FILE_ID: '/api/linkfile/{0}',

  TIEU_CHI_TREE: '/api/tieuchi/tree',
  TIEU_CHI: '/api/tieuchi',
  NOI_DUNG_KIEM_TRA_TREE: '/api/noidungkiemtra/tree',

  TONTAI_GHINHAN_TAI_THOIDIEM_DONGDIEN: '/api/tontaithoidiemdongdien',
  TONTAI_GHINHAN_TAI_THOIDIEM_DONGDIEN_QUERY: '/api/tontaithoidiemdongdien?page={0}&limit={1}{2}',
  TONTAI_GHINHAN_TAI_THOIDIEM_DONGDIEN_ID: '/api/tontaithoidiemdongdien/{0}',
  DOWNLOAD_TONTAI_THOIDIEM_DONGDIEN: '/api/congtrinhxaydung/tontaithoidiemdongdien/{0}',

  MAU_PHU_LUC_TON_TAI: '/api/mauphuluctontai',
  MAU_PHU_LUC_TON_TAI_QUERY: '/api/mauphuluctontai?page={0}&limit={1}{2}',
  MAU_PHU_LUC_TON_TAI_ID: '/api/mauphuluctontai/{0}',
  NOI_DUNG_TON_TAI_BAN_GIAO_ID: '/api/mauphuluctontai/noidungtontaibangiao/{0}',
  DOWNLOAD_MAU_PHU_LUC_TON_TAI: '/api/congtrinhxaydung/mauphuluctontai/?id={0}',

  TON_TAI_THOI_DIEM_BAN_GIAO: '/api/tontaithoidiembangiao',
  NOI_DUNG_TON_TAI_THOI_DIEM_BAN_GIAO_QUERY: '/api/tontaithoidiembangiao/noidungtontai?page={0}&limit={1}{2}',
  TON_TAI_THOI_DIEM_BAN_GIAO_QUERY: '/api/tontaithoidiembangiao?page={0}&limit={1}{2}',
  TON_TAI_THOI_DIEM_BAN_GIAO_ID: '/api/tontaithoidiembangiao/{0}',
  DOWNLOAD_TON_TAI_THOI_DIEM_BAN_GIAO: '/api/congtrinhxaydung/tontaithoidiembangiao/?id={0}',

  CONG_TRINH_XU_LY_HET_TON_TAI: '/api/congtrinhxulyhettontai',
  CONG_TRINH_XU_LY_HET_TON_TAI_QUERY: '/api/congtrinhxulyhettontai?page={0}&limit={1}{2}',
  CONG_TRINH_XU_LY_HET_TON_TAI_ID: '/api/congtrinhxulyhettontai/{0}',
  DOWNLOAD_CONG_TRINH_XU_LY_HET_TON_TAI: '/api/congtrinhxaydung/congtrinhxulyhettontai/?{0}',
  CONG_TRINH_XAY_DUNG_FIND_ONE: '/api/congtrinhxaydung',

  CONG_TRINH_DONG_DIEN_CHUA_BAN_GIAO: '/api/congtrinhxaydung/dongdienchuabangiao',
  DOWNLOAD_CONG_TRINH_DONG_DIEN_CHUA_BAN_GIAO: '/api/congtrinhxaydung/dongdienchuabangiao/download',

  CONG_TRINH_BAN_GIAO_NHUNG_CHUA_HET_TON_TAI: '/api/congtrinhxaydung/bangiaochuahettontai',
  DOWNLOAD_CONG_TRINH_BAN_GIAO_NHUNG_CHUA_HET_TON_TAI: '/api/congtrinhxaydung/bangiaochuahettontai/download',

  BIEN_BAN_XAC_NHAN_DONG_DIEN: '/api/bienbanxacnhandongdien',
  BIEN_BAN_XAC_NHAN_DONG_DIEN_ID: '/api/bienbanxacnhandongdien/{0}',
  BIEN_BAN_XAC_NHAN: '/api/bienbanxacnhan',
  BIEN_BAN_XAC_NHAN_ID: '/api/bienbanxacnhan/{0}',
  TON_TAI_DA_XAC_NHAN_ID: '/api/bienbanxacnhandongdien/congtrinhid/{0}',
  CONG_TRINH_DA_XU_LY_HET_TON_TAI: '/api/bienbanxacnhandongdien/congtrinhdaxulyhettontai',
  DOWNLOAD_BIEN_BAN_XAC_NHAN_DONG_DIEN: '/api/bienbanxacnhandongdien/download/?id={0}',
  FILE_BIEN_BAN: '/api/filebienban',
  FILE_BIEN_BAN_ID: '/api/filebienban/{0}',
  ANH_TON_TAI: '/api/anhtontai',
  ANH_TON_TAI_ID: '/api/anhtontai/{0}',
  TON_TAI_LAM_QUANG: '/api/tontailamquang',
  TON_TAI_LAM_QUANG_ID: '/api/tontailamquang/{0}',

  KHIEM_KHUYET_THIET_BI: '/api/khiemkhuyetthietbi',
  KHIEM_KHUYET_THIET_BI_ID: '/api/khiemkhuyetthietbi/{0}',
  KHIEM_KHUYET_THIET_BI_BY_TON_TAI_ID: '/api/khiemkhuyetthietbi/tontai/{0}',

  SO_LUONG_COT_DIEN_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/cotdientheohang{0}',
  SO_LUONG_COT_DIEN_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/cotdientheodonvi{0}',

  SO_LUONG_CACH_DIEN_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/cachdientheohang{0}',
  SO_LUONG_CACH_DIEN_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/cachdientheodonvi{0}',

  SO_LUONG_DAY_DAN_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/daydantheohang{0}',
  SO_LUONG_DAY_DAN_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/daydantheodonvi{0}',

  SO_LUONG_DAY_CHONG_SET_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/chongsettheohang{0}',
  SO_LUONG_DAY_CHONG_SET_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/chongsettheodonvi{0}',

  SO_LUONG_DAY_CAP_QUANG_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/capquangtheohang{0}',
  SO_LUONG_DAY_CAP_QUANG_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/capquangtheodonvi{0}',

  SO_LUONG_THEO_HANG_SAN_XUAT: '/api/baocaokhiemkhuyetthietbi/soluongtheohang{0}',
  SO_LUONG_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/soluongtheodonvi{0}',

  SO_LUONG_DAY_TIEP_DAT_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/tiepdattheohang{0}',
  SO_LUONG_DAY_TIEP_DAT_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/tiepdattheodonvi{0}',

  SO_LUONG_DAY_GIAO_CHEO_THEO_HANG: '/api/baocaokhiemkhuyetthietbi/giaocheotheohang{0}',
  SO_LUONG_DAY_GIAO_CHEO_THEO_DON_VI: '/api/baocaokhiemkhuyetthietbi/giaocheotheodonvi{0}',

  TIEU_CHI_LAM_QUANG_TREE: '/api/tieuchilamquang/tree',
  TIEU_CHI_LAM_QUANG: '/api/tieuchilamquang',
  NOI_DUNG_LAM_QUANG_TREE: '/api/noidunglamquang/tree',
  NOI_DUNG_LAM_QUANG: '/api/noidunglamquang',
  NOI_DUNG_LAM_QUANG_ID: '/api/noidunglamquang/{0}',

  DOWNLOAD_TON_TAI_DONG_DIEN: '/api/congtrinhxaydung/tontaidongdien/download?{0}',
  DOWNLOAD_BIEN_BAN_XAC_NHAN: '/api/congtrinhxaydung/bienbanxacnhan/download?{0}',
  DOWNLOAD_TON_TAI_BAN_GIAO: '/api/congtrinhxaydung/tontaibangiao/download?{0}',

  PHU_LUC_TON_TAI: '/api/phuluctontai',
  PHU_LUC_TON_TAI_ID: '/api/phuluctontai/{0}',
  DOWNLOAD_PHU_LUC_TON_TAI: '/api/congtrinhxaydung/phuluctontai/download?{0}',

  CONG_TRINH_BAN_GIAO_DA_HET_TON_TAI: '/api/congtrinhxaydung/congtrinhxulyhettontai',
  DOWNLOAD_CONG_TRINH_BAN_GIAO_DA_HET_TON_TAI: '/api/congtrinhxaydung/congtrinhxulyhettontai/download',

  FILE_IMPORT_LOCATION_TEMP: '/api/filesimporttemp/?type={0}',

  CAI_DAT_APP: '/api/cai-dat-app',
  INSTALL_LINK: '/api/cai-dat-app/install-link',

};
