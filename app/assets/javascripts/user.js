$(function(){
  var search_list = $('#user-search-result');
  var search_tag = $('#chat-group-users');
  
  function appendUsers(user){
   var html = `<div class="chat-group-user clearfix">
   <p class="chat-group-user__name">${user.name}</p>
   <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id='${user.id}' data-user-name="${user.name}">追加</div>
 </div>`
    search_list.append(html);
  }

  function appendErrMsgToHTML(msg){
    var html = '<label class="chat-group-form__label" for="chat_group_チャットメンバーを追加">チャットメンバーを追加</label>'
  
    search_list.append(html);
  }
  function appendGroupUser(id,name){
 
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
    <input name='group[user_ids][]' type='hidden' value=${id}}>
    <p class='chat-group-user__name'>${name}</p>
    <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
  </div>`
  search_tag.append(html);

  }
  

 
 
 
  $("#user-search-field").on("keyup",function(){
    var input = $("#user-search-field").val();
    
    $.ajax({
      type: 'GET',
      url: '/users',
      data: {keyword: input},
      dataType: 'json'
    })
   
    .done(function(users){
     
      $(".chat__group_name chat-group-form__input").empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUsers(user);
        });
      }
      else{
        appendErrMsgToHTML("一致するものがありません");
      }
      
    })

    .fail(function(){
      alert('失敗しました')
    })
  });

 $(document).on("click",".chat-group-user__btn--add",function(){
  
  var id = $(this).attr("data-user-id");
  var name = $(this).attr("data-user-name");
   appendGroupUser(id,name);

 $(document).on("click",".user-search-remove",function(){
    $("#chat-group-users").remove();
 })
  


 
   
 });
});

