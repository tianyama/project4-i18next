import { Translation  } from 'react-i18next';

export const statusList = [
  {value: null, label: <Translation>{t => t('All')}</Translation>},
  {value: true, label: <Translation>{t => t('Completed')}</Translation>},
  {value: false, label: <Translation>{t => t('Todo')}</Translation>},
]

export const priorityList = [
  {value: 1, label: 'Low', color: "default"},
  {value: 2, label: 'Medium', color: "blue"},
  {value: 3, label: 'High', color: 'red'},
]