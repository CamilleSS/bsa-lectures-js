import { Angular4Pt1Page } from './app.po';

describe('angular4-pt1 App', () => {
  let page: Angular4Pt1Page;

  beforeEach(() => {
    page = new Angular4Pt1Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
