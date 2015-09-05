$(function(){
  window.app = new App();
  window.appView = new AppView({model: app});
  $('body').append(appView.render());
});


