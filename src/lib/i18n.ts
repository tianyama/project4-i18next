import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      Title: "TODO APP with REDUX",
      FilterStatus: "Filter by status",
      FilterPriority: "Filter by priority",
      All: "All",
      Completed: "Completed",
      Todo: "Todo", 
      High: "High",
      Medium: "Medium",
      Low: "Low",
      ModalTitle: "Edit Task",
      LackText: "Please enter task name",
      "" : "",
    }
  },
  vn: {
    translation: {
      Title: "Ứng dụng todo list với redux",
      FilterStatus: "Lọc theo trạng thái",
      FilterPriority: "Lọc theo độ ưu tiên",
      All: "Tất cả",
      Completed: "Hoàn thành",
      Todo: "Cần làm", 
      High: "Cao",
      Medium: "Vừa",
      Low: "Thâp",
      ModalTitle: "Chỉnh sửa",
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