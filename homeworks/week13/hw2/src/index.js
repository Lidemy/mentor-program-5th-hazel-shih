/* eslint-disable */
import { getCommentAPI, addCommentAPI } from './api';
import { addCommentToDom, addCSStoHTMLtag } from './utils';
import { getCssElements, getForm, getLoadMoreBtn } from './templates';
import $ from 'jquery';

export function init(params) {
  let siteKey = "";
  let apiUrl = "";
  let containerElement = null;
  let containerSelector = null;

  let addCommentFormClassName;
  let addCommentFormSelector;
  let commentsContainerClassName;
  let commentsContainerSelector;
  let loadMoreBtnClassName;
  let loadMoreBtnSelector;
  let commentPerPage = 5;
  let lastID = null;

  siteKey = params.siteKey;
  apiUrl = params.apiUrl;
  containerElement = $(`<div class="${params.containerClassName}"></div>`);
  containerSelector = `.${params.containerClassName}`
  //加上最外層的container
  $('body').append(containerElement);
  addCommentFormClassName = `${siteKey}-add-comment-form`;
  commentsContainerClassName = `${siteKey}-comments`;
  commentsContainerSelector = `.${commentsContainerClassName}`;
  containerElement.append(getForm(addCommentFormClassName, commentsContainerClassName));
  //加上載入更多按鈕
  loadMoreBtnClassName = `${siteKey}-load-more`;
  const loadMoreBtnHTML = getLoadMoreBtn(loadMoreBtnClassName);
  containerElement.append(loadMoreBtnHTML);
  
  //為 tag 動態加入 CSS
  loadMoreBtnSelector = `.${siteKey}-load-more`;
  let cssElements = getCssElements(containerSelector, loadMoreBtnSelector);
  for (let i = 0; i < cssElements.length; i++) {
    addCSStoHTMLtag(cssElements[i]);
  }
  //一開始先載入最新的五則留言
  getComments();
  //載入更多留言
  containerElement.on("click", loadMoreBtnSelector, function () {
    getComments();
  });
  //新增留言
  addCommentFormSelector = `.${addCommentFormClassName}`;
  $(addCommentFormSelector).submit((e) => {
    e.preventDefault();
    const commentData = {
      site_key: siteKey,
      nickname: $(`${addCommentFormSelector} input[name=nickname]`).val(),
      content: $(`${addCommentFormSelector} textarea[name=content]`).val(),
    };
    addCommentAPI(apiUrl, commentData, function(data){
      if (!data.ok) {
        alert(data.message);
        return;
      }
      addCommentToDom($(commentsContainerSelector), commentData, false);
      $("input[name=nickname]").val("");
      $("textarea[name=content]").val("");
    });
  });
  function getComments() {
    getCommentAPI(apiUrl, siteKey, lastID, function (data) {
      const comments = data.discussions;
      if (comments.length === 0) {
        $(loadMoreBtnSelector).remove();
        $(containerSelector).append('<p>沒有更多留言嚕！</p>')
        return
      }
      lastID = comments[comments.length - 1].id;
      for (let i = 0; i < comments.length; i++) {
        addCommentToDom($(commentsContainerSelector), comments[i], true);
      }
    });
  }
}
