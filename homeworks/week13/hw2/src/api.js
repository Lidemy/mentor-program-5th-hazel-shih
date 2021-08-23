/* eslint-disable */
import $ from 'jquery';

export function getCommentAPI(apiUrl, siteKey, lastID, cb) {
  let url = `${apiUrl}api_comments.php?site_key=${siteKey}`;
  if (lastID) {
    url += `&lastID=${lastID}`;
  }

  $.ajax({
    type: "GET",
    url: url,
    success: function (data) {
      if (!data.ok) {
        alert(data.message);
        return;
      }
      cb(data);
    },
    error: function (err) {
      alert("伺服器發生錯誤，請稍後再試");
      console.log(err);
      return;
    },
  });
}

export function addCommentAPI(apiUrl, commentData, cb){
  $.ajax({
    type: "POST",
    url: `${apiUrl}api_add_comments.php`,
    data: commentData,
    success: function (data) {
      cb(data);
    },
    error: function (err) {
      console.log(err);
      alert("發生錯誤，請稍後再試");
      return;
    },
  });
}
