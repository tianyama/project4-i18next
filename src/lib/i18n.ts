import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Title: "TODO APP with REDUX",
      FilterStatus: "Filter by status",
      FilterPriority: "Filter by priority",
      SortBy: "Sort by",
      Status: "Status",
      Priority: "Priority",
      Text: "Task name",
      All: "All",
      Asc: "Ascending",
      Desc: "Descending",
      Completed: "Completed",
      Todo: "Todo", 
      High: "High",
      Medium: "Medium",
      Low: "Low",
      ModalTitle: "Edit Task",
      ConfirmDelTitle: "Delete this task",
      ConfirmDel: "Are you sure?",
      LackText: "Please enter task name",
      "" : "",
    }
  },
  vn: {
    translation: {
      Title: "Ứng dụng todo list với redux",
      FilterStatus: "Lọc theo trạng thái",
      FilterPriority: "Lọc theo độ ưu tiên",
      SortBy: "Sắp xếp theo",
      Status: "Trạng thái",
      Priority: "Độ ưu tiên",
      Text: "Tên",
      Asc: "Tăng dần",
      Desc: "Giảm dần",
      All: "Tất cả",
      Completed: "Hoàn thành",
      Todo: "Cần làm", 
      High: "Cao",
      Medium: "Vừa",
      Low: "Thâp",
      ModalTitle: "Chỉnh sửa",
      ConfirmDelTitle: "Xóa task",
      ConfirmDel: "Bạn chắc chắn muốn xóa task này?",
      LackText: "Vui lòng nhập nội dung",
      "" : "",
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;