import React from 'react';
import moment from 'moment';

/**
 * 生成唯一字符串
 */
export function uuid() {
  const s = [];
  const hexDigits = '0123456789abcdef';
  for (let i = 0; i < 36; i += 1) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
  }
  s[14] = '4';
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
  s[8] = '-';
  s[13] = '-';
  s[18] = '-';
  s[23] = '-';
  return s.join('');
}

/**
 *
 * @param rowNum 表格行数
 * @param colNum 表格列数
 */
export function initTable(rowNum, colNum) {
  // 表头
  let thList = '';
  for (let num = 0; num < colNum; num += 1) {
    thList += ' <th>&nbsp;</th>';
  }
  const trTh = `<tr>${thList}</tr>`;
  // 多少行
  let trTdList = '';
  for (let trNum = 0; trNum < rowNum; trNum += 1) {
    let tdList = '';
    for (let num = 0; num < colNum; num += 1) {
      tdList += ' <td></td>';
    }
    trTdList += `<tr>${tdList}</tr>`;
  }
  return `<table border="0" width="100%" cellPadding="0" cellSpacing="0" class="rich-table">${trTh}${trTdList}</table>`;
}

/**
 * 获取 输入框的 html 字符串
 * @param param
 * @returns {string}
 */
export function initInput(id) {
  // 输入框类型为文本
  return `<textarea rows="1" cols="30" id="${id}" onkeyup="onKeyUpTextArea('${id}')" style="resize: horizontal;vertical-align: middle;width: 80px;">xxxx</textarea>`;
}


/**
 * 插入下拉框
 */
export function initSelect(param) {
  const { textArray, id,check=1 } = param;
  const option = textArray.map((item, index) =>{
    const selected = (index + 1) === check ? 'selected' : '';
    return `<option name="${id}" value="${index}" ${selected} >${item}</option>`;
  });
  return `<select id="${id}" class="select ac-select" onchange="onChangeSelect()">${option}</select>`;
}

/**
 * 插入单选框
 * @param param
 * @returns {string}
 */
export function initRadio(param) {
  const {
    data, id, check, direction,
  } = param;
  let radioString = '';
  for (let i = 0; i < data.length; i += 1) {
    // 默认选中
    const checked = (i + 1) === check ? 'checked' : '';
    if (direction === 'horizontal') {
      radioString += `<span><input name="${id}" onclick="onClickRadio('${id}')" type="radio" ${checked} style="vertical-align: middle;" value=${i} acType="radio" />&nbsp;&nbsp;&nbsp;&nbsp;${data[i]}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    } else {
      radioString += `<div><span><input name="${id}"  onclick="onClickRadio('${id}')" style="vertical-align: middle;" type="radio" ${checked} value=${i} acType="radio" />&nbsp;&nbsp;&nbsp;&nbsp;${data[i]}</span></div>`;
    }
  }
  return `<span id="${id}">${radioString}</span>`;
}

/**
 * 插入多选框
 * @param param
 * @returns {string}
 */
export function initCheckbox(param) {
  const { data,id, check, direction, } = param;
  let checkboxString = '';
  for (let i = 0; i < data.length; i += 1) {
    const checked = (i + 1) === check ? 'checked' : '';
    if (direction === 'horizontal') {
      checkboxString += `<span><input name="${id}" onclick="onClickCheckbox()" type="checkbox"  ${checked} value=${i}  />&nbsp;&nbsp;&nbsp;&nbsp;${data[i]}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
    } else {
      checkboxString += `<div><input name="${id}" onclick="onClickCheckbox()"  type="checkbox" ${checked} value=${i} />&nbsp;&nbsp;&nbsp;&nbsp;${data[i]}</div>`;
    }
  }
  return `<span id="${id}">${checkboxString}</span>`;
}

export function initDate(id) {
  const date = moment()
    .format('YYYY-MM-DD');
  return `<input type="text" id="${id}" value="${date}" acType="date" style="width: 90px"/>`;
}


export function initFixedRadio(param) {
  const { data, id, defaultVal } = param;
  let radioString = '';
  for (const item of data) {
    // 默认选中
    const checked = item === defaultVal ? 'checked' : '';
    radioString += `<span><input name="${id}" onclick="onClickRadio('${id}')" type="radio" ${checked} value=${item} />&nbsp;&nbsp;&nbsp;&nbsp;${item}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
  }
  return `<span id="${id}">${radioString}</span>`;
}


export function initFixedCheckbox(param) {
  const { data, id, defaultVal } = param;
  let checkboxString = '';
  for (const item of data) {
    // 默认选中
    const checked = item === defaultVal ? 'checked' : '';
    checkboxString += `<span><input name="${id}" onclick="onClickCheckbox()" type="checkbox"  ${checked} value=${item}  />&nbsp;&nbsp;&nbsp;&nbsp;${item}&nbsp;&nbsp;&nbsp;&nbsp;</span>`;
  }
  return `<span id="${id}">${checkboxString}</span>`;
}


export function sectionToChinese(section) {
  const chnNumChar = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
  const chnUnitChar = ['', '十', '百', '千'];
  let strIns = '';
  let chnStr = '';
  let unitPos = 0;
  let zero = true;
  while (section > 0) {
    const v = section % 10;
    if (v === 0) {
      if (!zero) {
        zero = true;
        chnStr = chnNumChar[v] + chnStr;
      }
    } else {
      zero = false;
      strIns = chnNumChar[v];
      strIns += chnUnitChar[unitPos];
      chnStr = strIns + chnStr;
    }
    unitPos++;
    section = Math.floor(section / 10);
  }
  return chnStr;
}


export var fixedDate = [
  {
    id: 'buyer',
    type: 'text',
    type_cn: '文本',
    title: '买方名称',
    data: ['xxxx'],
    defaultVal: 'xxxx',
    status: false,
  },
  {
    id: 'salername',
    type: 'text',
    type_cn: '文本',
    title: '卖方名称',
    data: ['xxxx'],
    defaultVal: 'xxxx',
    status: false,
  },
  {
    id: 'contractsign',
    type: 'date',
    title: '合同签订日期',
    type_cn: '日期',
    data: ['2019-02-20'],
    defaultVal: '2019-02-20',
    status: false,
  },
  {
    id: 'contractstr',
    type: 'date',
    title: '合同开始日期',
    type_cn: '日期',
    data: ['2019-02-20'],
    defaultVal: '2019-02-20',
    status: false,
  },
  {
    id: 'contractend',
    type: 'date',
    title: '合同结束日期',
    type_cn: '日期',
    data: ['2019-02-20'],
    defaultVal: '2019-02-20',
    status: false,
  },
  {
    id: 'payterm',
    type: 'select',
    type_cn: '下拉',
    title: '付款条件',
    data: ['现金支付', '微信支付', '支付宝支付'],
    defaultVal: '现金支付',
    isEdit: false,
    status: false,
  },
  {
    id: 'isrebate',
    type: 'radio',
    type_cn: '单选',
    title: '是否返利',
    data: ['是', '否'],
    defaultVal: '是',
    status: false,
  },
];


// CMD
export var iconCmdList = [
  {
    cmd: 'bold',
    icon: 'icon-bold',
    title: '加粗',
  },
  {
    cmd: 'italic',
    icon: 'icon-italic',
    title: '斜体',
  },
  {
    cmd: 'underline',
    icon: 'icon-underline',
    title: '下划线',
  },
  {
    cmd: 'strikeThrough',
    icon: 'icon-strikethrough',
    title: '删除线',
  }, {
    cmd: 'indent',
    icon: 'icon-indent',
    title: '前进',
  }, {
    cmd: 'outdent',
    icon: 'icon-outdent',
    title: '后退',
  }, {
    cmd: 'removeFormat',
    icon: 'icon-geshishua',
    title: '格式刷',
  },
];


// 文字对齐
export var textAlignList = [
  {
    cmd: 'justifyLeft',
    title: '靠左',
    icon: 'icon-align-left',
  }, {
    cmd: 'justifyCenter',
    title: '居中',
    icon: 'icon-align-center',
  },
  {
    cmd: 'justifyRight',
    title: '靠右',
    icon: 'icon-align-right',
  },
];

// 下拉列表
export var popList = [
  {
    cmd: 'fontSize',
    pTitle: '字体大小',
    width: '160px',
    icon: 'icon-font-size',
    ulCss: 'w-e-list',
    liCss: 'w-e-item',
    selectList: [
      {
        value: '1',
        title: 'x-small',
        liCssText: { fontSize: 'x-small' },
      },
      {
        value: '2',
        title: 'small',
        liCssText: { fontSize: 'small' },
      },
      {
        value: '3',
        title: 'normal',
        liCssText: { fontSize: 'normal' },
      },
      {
        value: '4',
        title: 'large',
        liCssText: { fontSize: 'large' },
      },
      {
        value: '5',
        title: 'x-large',
        liCssText: { fontSize: 'x-large' },
      },
      {
        value: '6',
        title: 'xx-large',
        liCssText: { fontSize: 'xx-large' },
      },
    ],
  },
  {
    cmd: 'fontName',
    pTitle: '字体名称',
    width: '120px',
    icon: 'icon-ai247',
    ulCss: 'w-e-list',
    liCss: 'w-e-item',
    selectList: [
      {
        value: '宋体',
        title: '宋体',
        liCssText: { fontFamily: '宋体' },
      },
      {
        value: '微软雅黑',
        title: '微软雅黑',
        liCssText: { fontFamily: '微软雅黑' },
      },
      {
        value: 'Arial',
        title: 'Arial',
        liCssText: { fontFamily: 'Arial' },
      },
      {
        value: 'Tahoma',
        title: 'Tahoma',
        liCssText: { fontFamily: 'Tahoma' },
      },
      {
        value: 'Verdana',
        title: 'Verdana',
        liCssText: { fontFamily: 'Verdana' },
      },
    ],
  }, {
    cmd: 'forecolor',
    pTitle: '字体颜色',
    width: '100px',
    icon: 'icon-highlight',
    ulCss: 'w-e-block',
    liCss: 'w-e-list-level',
    selectList: [
      {
        value: '#000000',
        title: '黑色',
        spanCssText: { color: '#000000' },
      },
      {
        value: 'red',
        title: '红色',
        spanCssText: { color: 'red' },
      }, {
        value: '#1c487f',
        title: '',
        spanCssText: { color: '#1c487f' },
      }, {
        value: '#4d80bf',
        title: '',
        spanCssText: { color: '#4d80bf' },
      }, {
        value: '#c24f4a',
        title: '',
        spanCssText: { color: '#c24f4a' },
      }, {
        value: '#8baa4a',
        title: '',
        spanCssText: { color: '#8baa4a' },
      }, {
        value: '#7b5ba1',
        title: '',
        spanCssText: { color: '#7b5ba1' },
      }, {
        value: '#46acc8',
        title: '',
        spanCssText: { color: '#46acc8' },
      }, {
        value: '#f9963b',
        title: '',
        spanCssText: { color: '#f9963b' },
      },
    ],
  },
  {
    cmd: 'backColor',
    pTitle: '背景色',
    width: '100px',
    icon: 'icon-brush',
    ulCss: 'w-e-block',
    liCss: 'w-e-list-level',
    selectList: [
      {
        value: '#000000',
        title: '',
        spanCssText: { color: '#000000' },
      },
      {
        value: 'red',
        title: '',
        spanCssText: { color: 'red' },
      }, {
        value: '#1c487f',
        title: '',
        spanCssText: { color: '#1c487f' },
      }, {
        value: '#4d80bf',
        title: '',
        spanCssText: { color: '#4d80bf' },
      }, {
        value: '#c24f4a',
        title: '',
        spanCssText: { color: '#c24f4a' },
      }, {
        value: '#8baa4a',
        title: '',
        spanCssText: { color: '#8baa4a' },
      }, {
        value: '#7b5ba1',
        title: '',
        spanCssText: { color: '#7b5ba1' },
      }, {
        value: '#46acc8',
        title: '',
        spanCssText: { color: '#46acc8' },
      }, {
        value: '#f9963b',
        title: '',
        spanCssText: { color: '#f9963b' },
      },
    ],
  },
  {
    cmd: 'lineHeight',
    pTitle: '行高',
    icon: 'icon-line-height',
    ulCss: 'w-e-list',
    liCss: 'w-e-item',
    selectList: [
      {
        title: '正常',
        value: '1',
      },
      {
        title: '1.2倍',
        value: '1.2',
      },
      {
        title: '1.5倍',
        value: '1.5',
      }, {
        title: '1.8倍',
        value: '1.8',
      }, {
        title: '2.0倍',
        value: '2.0',
      }, {
        title: '2.5倍',
        value: '2.5',
      },
      {
        title: '3.0倍',
        value: '3.0',
      }, {
        title: '4.0倍',
        value: '4.0',
      },
    ],
  }, {
    cmd: 'letterSpacing',
    pTitle: '字间距',
    icon: 'icon-zuijialiekuan',
    ulCss: 'w-e-list',
    liCss: 'w-e-item',
    selectList: [
      {
        title: '正常',
        value: '0px',
      },
      {
        title: '1px',
        value: '1px',
      },
      {
        title: '2px',
        value: '2px',
      }, {
        title: '3px',
        value: '3px',
      }, {
        title: '4px',
        value: '4px',
      }, {
        title: '5px',
        value: '5px',
      },
      {
        title: '6px',
        value: '6px',
      },
    ],
  },

];
