/* eslint-disable */
export function escape(str){
  return str.replace(/\&/g, '&amp;')
      .replace(/\</g, '&lt;')
      .replace(/\>/g, '&gt;')
      .replace(/\"/g, '&quot;')
      .replace(/\'/g, '&#x27')
      .replace(/\//g, '&#x2F');
  }

export function addCommentToDom(parentNode, comment, isAppend) {
    var cardContent = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${escape(comment.nickname)}</h5>
          <p class="card-text">${escape(comment.content)}</p>
        </div>
      </div>`;
    if (isAppend) {
      parentNode.append(cardContent);
      return;
    }
    parentNode.prepend(cardContent);
    return;
  }

export function addCSStoHTMLtag(cssStr) {
    var style = document.createElement("style");
    document.head.appendChild(style);
    style.sheet.insertRule(cssStr);
  }