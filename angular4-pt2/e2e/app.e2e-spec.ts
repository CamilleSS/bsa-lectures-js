import { Angular4Pt2Page } from './app.po';

describe('angular4-pt2 App', () => {
  let page: Angular4Pt2Page;

  beforeEach(() => {
    page = new Angular4Pt2Page();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
