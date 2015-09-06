$(function(){
  window.app = new App();
  window.appView = new AppView({model: app});
  window.histView = new HistoryView({model: app});
  $('body').append(appView.render());
  $('body').append(histView.render().hide());
});


