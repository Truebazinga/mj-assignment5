describe('add todo', function () {
  let page;

  before (async function () {
    page = await browser.newPage();
    await page.goto('http://127.0.0.1:7001/');
  });

  after (async function () {
    // await page.close();
  });

  it('should have correct title', async function() {
      expect(await page.title()).to.eql('Koa • Todo');
  })
  it('should new todo correct', async function() {
    await page.click('#new-todo', {delay: 500});
    await page.type('#new-todo', 'new todo item1', {delay: 50});
    await page.keyboard.press("Enter");
    let todoList = await page.waitFor('#todo-list');
    const expectInputContent = await page.evaluate(todoList => todoList.lastChild.querySelector('label').textContent, todoList);
    expect(expectInputContent).to.eql('new todo item1');
  }) 
  it('should complete correct', async function() {
    await page.click('#todo-list input',{delay: 500});
    let todoList = await page.waitFor('#todo-list');
    const expectInputContent = await page.evaluate(x => x.lastChild.className, todoList);
    expect(expectInputContent).to.eql('completed');
  })
  it('should length', async function() {
    let todoList = await page.waitFor('#todo-list');
    const expectInputContent = await page.evaluate(x => x.childElementCount, todoList);
    expect(expectInputContent).to.eql(1);
  })
});