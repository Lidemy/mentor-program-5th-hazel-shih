/* eslint-disable */
export function getCssElements(containerSelector, loadMoreSelector){
  return [
    `${containerSelector} { padding: 40px; }`,
    ".card { margin-top: 15px; }",
    `${loadMoreSelector} { margin-top: 20px; }`,
    `${loadMoreSelector}__link { text-decoration: none; color: black;}`,
  ];
} 

export function getForm(className, commentClassName){
    return `
    <form class="${className}" method="POST">
      <div class="mb-3">
        <label for="nickname-text" class="form-label">暱稱：</label>
        <input type="text" class="form-control" name="nickname">
        <div class="form-text"></div>
      </div>
      <div class="mb-3">
        <label for="content-text" class="form-label">留言內容：</label>
        <textarea class="form-control" name="content"></textarea>
      </div>
      <button type="submit" class="btn btn-primary">送出</button>
      <div class="${commentClassName}"></div>
    </form>`
  }

export function getLoadMoreBtn(className){
  return `<button type="button" class="${className} btn btn-info">載入更多</button>`;
}
