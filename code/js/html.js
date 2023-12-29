function plBtn(i, letter) {
  const html = `<div class="pl_item">
                  <div class="pl_btn df_ai_jc_ce" data-index="${i}">${letter}</div>
                </div>`

  return html
}

export { plBtn }
