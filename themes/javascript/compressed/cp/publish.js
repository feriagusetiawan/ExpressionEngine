/*!
 * ExpressionEngine - by EllisLab
 *
 * @package		ExpressionEngine
 * @author		ExpressionEngine Dev Team
 * @copyright	Copyright (c) 2003 - 2010, EllisLab, Inc.
 * @license		http://expressionengine.com/user_guide/license.html
 * @link		http://expressionengine.com
 * @since		Version 2.0
 * @filesource
 */

EE.publish=EE.publish||{};
EE.publish.category_editor=function(){var e=[],f=$("<div />"),b=$('<div id="cat_modal_container" />').appendTo(f),h={},l={},m=EE.BASE+"&C=admin_content&M=category_editor&group_id=",k,a,d;f.dialog({autoOpen:false,height:450,width:600,modal:true});$(".edit_categories_link").each(function(){var c=this.href.substr(this.href.lastIndexOf("=")+1);$(this).data("gid",c);e.push(c)});for(d=0;d<e.length;d++){h[e[d]]=$("#cat_group_container_"+[e[d]]);h[e[d]].data("gid",e[d]);l[e[d]]=$("#cat_group_container_"+
[e[d]]).find(".cat_action_buttons").remove()}k=function(c){h[c].text("loading...").load(m+c+"&timestamp="+ +new Date+" .pageContents table",function(){a.call(h[c],h[c].html(),false)})};a=function(c,i){var g=$(this),j=g.data("gid");c=$.trim(c);if(g.hasClass("edit_categories_link"))g=$("#cat_group_container_"+j);if(c[0]!=="<"&&i)return k(j);g.closest(".cat_group_container").find("#refresh_categories").show();var p=$(c),n;if(p.find("form").length){b.html(p);p=b.find("input[type=submit]");n=b.find("form");
var s=function(r){var q=r||$(this);r=q.serialize();q=q.attr("action");$.ajax({url:q,type:"POST",data:r,dataType:"html",beforeSend:function(){g.html(EE.lang.loading)},success:function(o){o=$.trim(o);f.dialog("close");if(o[0]=="<"){o=$(o).find(".pageContents table");o.find("form").length==0&&g.html(o);a.call(g,o,true)}else a.call(g,o,true)},error:function(o){f.dialog("close");a.call(g,o.error,true)}});return false};n.submit(s);var t={};t[p.remove().attr("value")]=function(){s(n)};f.dialog("open");f.dialog("option",
"buttons",t);f.one("dialogclose",function(){k(j)})}else l[j].clone().appendTo(g).show();return false};d=function(){var c=$(this).data("gid"),i=".pageContents";if($(this).hasClass("edit_cat_order_trigger")||$(this).hasClass("edit_categories_link"))i+=" table";c||(c=$(this).closest(".cat_group_container").data("gid"));h[c].text(EE.lang.loading);$.ajax({url:this.href+"&timestamp="+ +new Date+i,success:function(g){var j="";g=$.trim(g);if(g[0]=="<"){g=$(g).find(i);j=$("<div />").append(g).html();g.find("form").length==
0&&h[c].html(j)}a.call(h[c],j,true)},error:function(g){g=eval("("+g.responseText+")");h[c].html(g.error);a.call(h[c],g.error,true)}});return false};$(".edit_categories_link").click(d);$(".cat_group_container a:not(.cats_done)").live("click",d);$(".cats_done").live("click",function(){var c=$(this).closest(".cat_group_container");c.text("loading...").load(EE.BASE+"&C=content_publish&M=ajax_update_cat_fields&group_id="+c.data("gid")+"&timestamp="+ +new Date,function(i){c.html($(i).html())});return false})};
var selected_tab="";function get_selected_tab(){return selected_tab}function tab_focus(e){$(".menu_"+e).parent().is(":visible")||$("a.delete_tab[href=#"+e+"]").trigger("click");$(".tab_menu li").removeClass("current");$(".menu_"+e).parent().addClass("current");$(".main_tab").hide();$("#"+e).fadeIn("fast");$(".main_tab").css("z-index","");$("#"+e).css("z-index","5");selected_tab=e;$(".main_tab").sortable("refreshPositions")}EE.tab_focus=tab_focus;
function setup_tabs(){var e="";$(".main_tab").sortable({connectWith:".main_tab",appendTo:"#holder",helper:"clone",forceHelperSize:true,handle:".handle",start:function(f,b){b.item.css("width",$(this).parent().css("width"))},stop:function(f,b){b.item.css("width","100%")}});$(".tab_menu li a").droppable({accept:".field_selector, .publish_field",tolerance:"pointer",forceHelperSize:true,deactivate:function(){clearTimeout(e);$(".tab_menu li").removeClass("highlight_tab")},drop:function(f,b){field_id=b.draggable.attr("id").substring(11);
tab_id=$(this).attr("title").substring(5);$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown();tab_focus(tab_id);return false},over:function(){tab_id=$(this).attr("title").substring(5);$(this).parent().addClass("highlight_tab");e=setTimeout(function(){tab_focus(tab_id);return false},500)},out:function(){e!=""&&clearTimeout(e);$(this).parent().removeClass("highlight_tab")}});$("#holder .main_tab").droppable({accept:".field_selector",tolerance:"pointer",drop:function(f,
b){field_id=b.draggable.attr("id")=="hide_title"||b.draggable.attr("id")=="hide_url_title"?b.draggable.attr("id").substring(5):b.draggable.attr("id").substring(11);tab_id=$(this).attr("id");$("#hold_field_"+field_id).prependTo("#"+tab_id);$("#hold_field_"+field_id).hide().slideDown()}});$(".tab_menu li.content_tab a, #publish_tab_list a.menu_focus").unbind(".publish_tabs").bind("mousedown.publish_tabs",function(f){tab_id=$(this).attr("title").substring(5);tab_focus(tab_id);f.preventDefault()}).bind("click.publish_tabs",
function(){return false})}setup_tabs();
EE.publish.save_layout=function(){var e=0,f={},b={},h=0,l=false,m=$("#tab_menu_tabs li.current").attr("id");$(".main_tab").show();$("#tab_menu_tabs a:not(.add_tab_link)").each(function(){if($(this).parent("li").attr("id")&&$(this).parent("li").attr("id").substring(0,5)=="menu_"){var c=$(this).parent("li").attr("id").substring(5),i=$(this).parent("li").attr("id").substring(5),g=$(this).parent("li").attr("title");h=0;visible=true;if($(this).parent("li").is(":visible")){lay_name=c;f[lay_name]={};f[lay_name]._tab_label=
g}else{l=true;visible=false}$("#"+i).find(".publish_field").each(function(){var j=$(this),p=this.id.replace(/hold_field_/,"");j=Math.round(j.width()/j.parent().width()*10)*10;var n=$("#sub_hold_field_"+p+" .markItUp ul li:eq(2)");n=n.html()!=="undefined"&&n.css("display")!=="none"?true:false;j={visible:$(this).css("display")==="none"||visible===false?false:true,collapse:$("#sub_hold_field_"+p).css("display")==="none"?true:false,htmlbuttons:n,width:j+"%"};if(visible===true){j.index=h;f[lay_name][p]=
j;h+=1}else b[p]=j});visible===true&&e++}});if(l==true){var k,a,d=0;for(darn in f){a=darn;for(k in f[a])if(f[a][k].index>d)d=f[a][k].index;break}$.each(b,function(){this.index=++d});jQuery.extend(f[a],b)}EE.tab_focus(m.replace(/menu_/,""));if(e===0)$.ee_notice(EE.publish.lang.tab_count_zero,{type:"error"});else $("#layout_groups_holder input:checked").length===0?$.ee_notice(EE.publish.lang.no_member_groups,{type:"error"}):$.ajax({type:"POST",dataType:"json",url:EE.BASE+"&C=content_publish&M=save_layout",
data:"XID="+EE.XID+"&json_tab_layout="+JSON.stringify(f)+"&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id,success:function(c){if(c.messageType==="success")$.ee_notice(c.message,{type:"success"});else c.messageType==="failure"&&$.ee_notice(c.message,{type:"error"})}})};
EE.publish.remove_layout=function(){if($("#layout_groups_holder input:checked").length===0)return $.ee_notice(EE.publish.lang.no_member_groups,{type:"error"});$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=save_layout",data:"XID="+EE.XID+"&json_tab_layout={}&"+$("#layout_groups_holder input").serialize()+"&channel_id="+EE.publish.channel_id+"&field_group="+EE.publish.field_group,success:function(){$.ee_notice(EE.publish.lang.layout_removed+' <a href="javascript:location=location">'+EE.publish.lang.refresh_layout+
"</a>",{duration:0,type:"success"})}})};EE.date_obj_time=function(){var e=new Date,f=e.getHours();e=e.getMinutes();var b="";if(e<10)e="0"+e;if(EE.date.format=="us")if(f>11){f-=12;b=" PM"}else b=" AM";return" '"+f+":"+e+b+"'"}();file_manager_context="";
function disable_fields(e){var f=$(".main_tab input, .main_tab textarea, .main_tab select, #submit_button"),b=$("#submit_button"),h=$("#holder").find("a");if(e){f.attr("disabled",true);b.addClass("disabled_field");h.addClass("admin_mode");$("#holder div.markItUp, #holder p.spellcheck").each(function(){$(this).before('<div class="cover" style="position:absolute;width:100%;height:50px;z-index:9999;"></div>').css({})})}else{f.removeAttr("disabled");b.removeClass("disabled_field");h.removeClass("admin_mode");
$(".cover").remove()}}
function liveUrlTitle(){var e=EE.publish.default_entry_title,f=EE.publish.word_separator,b=document.getElementById("title").value||"",h=document.getElementById("url_title"),l=RegExp(f+"{2,}","g"),m=f!=="_"?/\_/g:/\-/g,k="";if(e!=="")if(b.substr(0,e.length)===e)b=b.substr(e.length);b=EE.publish.url_title_prefix+b;b=b.toLowerCase().replace(m,f);for(e=0;e<b.length;e++){m=b.charCodeAt(e);if(m>=32&&m<128)k+=b.charAt(e);else if(m in EE.publish.foreignChars)k+=EE.publish.foreignChars[m]}b=k;b=b.replace("/<(.*?)>/g",
"");b=b.replace(/\s+/g,f);b=b.replace(/\//g,f);b=b.replace(/[^a-z0-9\-\._]/g,"");b=b.replace(/\+/g,f);b=b.replace(l,f);b=b.replace(/^[-_]|[-_]$/g,"");b=b.replace(/\.+$/g,"");if(h)h.value=b.substring(0,75)}
$(document).ready(function(){function e(a){if(a){a=a.toString();a=a.replace(/\(\!\(([\s\S]*?)\)\!\)/g,function(d,c){var i=c.split("|!|");return altKey===true?i[1]!==undefined?i[1]:i[0]:i[1]===undefined?"":i[0]});return a=a.replace(/\[\!\[([\s\S]*?)\]\!\]/g,function(d,c){var i=c.split(":!:");if(k===true)return false;value=prompt(i[0],i[1]?i[1]:"");if(value===null)k=true;return value})}return""}function f(a,d){var c=$("input[name="+d+"]").closest(".publish_field");a.is_image==false?c.find(".file_set").show().find(".filename").html('<img src="'+
EE.PATH_CP_GBL_IMG+'default.png" alt="'+EE.PATH_CP_GBL_IMG+'default.png" /><br />'+a.name):c.find(".file_set").show().find(".filename").html('<img src="'+a.thumb+'" alt="'+a.name+'" /><br />'+a.name);$("input[name="+d+"_hidden]").val(a.name);$("select[name="+d+"_directory]").val(a.directory);$.ee_filebrowser.reset()}var b;$("#layout_group_submit").click(function(){EE.publish.save_layout();return false});$("#layout_group_remove").click(function(){EE.publish.remove_layout();return false});$("a.reveal_formatting_buttons").click(function(){$(this).parent().parent().children(".close_container").slideDown();
$(this).hide();return false});$("#write_mode_header .reveal_formatting_buttons").hide();if(EE.publish.smileys==true){$("a.glossary_link").click(function(){$(this).parent().siblings(".glossary_content").slideToggle("fast");$(this).parent().siblings(".smileyContent .spellcheck_content").hide();return false});$("a.smiley_link").toggle(function(){$(this).parent().siblings(".smileyContent").slideDown("fast",function(){$(this).css("display","")})},function(){$(this).parent().siblings(".smileyContent").slideUp("fast")});
$(this).parent().siblings(".glossary_content, .spellcheck_content").hide();$(".glossary_content a").click(function(){var a=$(this).closest(".publish_field"),d=a.attr("id").replace("hold_field_","field_id_");a.find("#"+d).insertAtCursor($(this).attr("title"));return false})}if(EE.publish.autosave){b=function(){var a=$("#tools:visible"),d;a.length===1&&disable_fields(true);d=$("#publishForm").serialize();if(a.length===0){disable_fields(false);$.ajax({type:"POST",url:EE.BASE+"&C=content_publish&M=autosave_entry",
data:d,success:function(c){if(isNaN(c)){if(EE.publish.autosave.error_state=="false"){$.ee_notice(c,{type:"error"});EE.publish.autosave.error_state="true"}}else{if(EE.publish.autosave.error_state=="true")EE.publish.autosave.error_state="false";$.ee_notice(EE.publish.autosave.success,{type:"success"})}}})}};setInterval(b,1E3*EE.publish.autosave.interval)}if(EE.publish.pages){b=$("#pages_uri");var h=EE.publish.pages.pagesUri;b.value||b.val(h);b.focus(function(){this.value===h&&$(this).val("")}).blur(function(){this.value===
""&&$(this).val(h)})}$.ee_filebrowser();var l="";EE.publish.show_write_mode===true&&$("#write_mode_textarea").markItUp(myWritemodeSettings);EE.publish.markitup.fields!==undefined&&$.each(EE.publish.markitup.fields,function(a){$("#"+a).markItUp(mySettings)});write_mode_height=$(window).height()-117;$("#write_mode_writer").css("height",write_mode_height+"px");$("#write_mode_writer textarea").css("height",write_mode_height-67-17+"px");var m=$(".write_mode_trigger").overlay({mask:{color:"#262626",loadSpeed:200,
opacity:0.85},onBeforeLoad:function(){var a=this.getTrigger()[0],d=$("#write_mode_textarea");l=a.id.match(/^id_\d+$/)?"field_"+a.id:a.id.replace(/id_/,"");d.val($("#"+l).val());d.focus()},top:"center",closeOnClick:false});$(".publish_to_field").click(function(){var a="#"+l.replace(/field_/,"");a=$(".write_mode_trigger").index(a);$("#"+l).val($("#write_mode_textarea").val());m.eq(a).overlay().close();return false});$(".closeWindowButton").click(function(){var a="#"+l.replace(/field_/,"");a=$(".write_mode_trigger").index(a);
m.eq(a).overlay().close();return false});var k=false;$.ee_filebrowser.add_trigger(".btn_img a, .file_manipulate",function(a){var d,c="",i="",g="",j="";textareaId=$(this).closest("#markItUpWrite_mode_textarea").length?"write_mode_textarea":$(this).closest(".publish_field").attr("id").replace("hold_field_","field_id_");if(textareaId!=undefined){d=$("#"+textareaId);d.focus()}if(a.is_image){i=EE.upload_directories[a.directory].properties;g=EE.upload_directories[a.directory].pre_format;j=EE.upload_directories[a.directory].post_format;
c=EE.filebrowser.image_tag.replace(/src="(.*)\[!\[Link:!:http:\/\/\]!\](.*)"/,'src="$1{filedir_'+a.directory+"}"+a.name+'$2"');c=c.replace(/\/?>$/,a.dimensions+" "+i+" />");c=g+c+j}else{i=EE.upload_directories[a.directory].file_properties;g=EE.upload_directories[a.directory].file_pre_format;g+='<a href="{filedir_'+a.directory+"}"+a.name+'" '+i+" >";j="</a>";j+=EE.upload_directories[a.directory].file_post_format}if(d.is("textarea")){if(!d.is(".markItUpEditor")){d.markItUp(myNobuttonSettings);d.closest(".markItUpContainer").find(".markItUpHeader").hide();
d.focus()}a.is_image?$.markItUp({replaceWith:c}):$.markItUp({key:"L",name:"Link",openWith:g,closeWith:j,placeHolder:a.name})}else d.val(function(p,n){n+=g+c+j;return e(n)});$.ee_filebrowser.reset()});$("input[type=file]","#publishForm").each(function(){var a=$(this).closest(".publish_field"),d=a.find(".choose_file");$.ee_filebrowser.add_trigger(d,$(this).attr("name"),f);a.find(".remove_file").click(function(){a.find("input[type=hidden]").val("");a.find(".file_set").hide();return false})});$(".hide_field span").click(function(){var a=
$(this).parent().parent().attr("id").substr(11),d=$("#hold_field_"+a);a=$("#sub_hold_field_"+a);if(a.css("display")=="block"){a.slideUp();d.find(".ui-resizable-handle").hide();d.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_collapse.png")}else{a.slideDown();d.find(".ui-resizable-handle").show();d.find(".field_collapse").attr("src",EE.THEME_URL+"images/field_expand.png")}return false});$(".close_upload_bar").toggle(function(){$(this).parent().children(":not(.close_upload_bar)").hide();
$(this).children("img").attr("src",EE.THEME_URL+"publish_plus.png")},function(){$(this).parent().children().show();$(this).children("img").attr("src",EE.THEME_URL+"publish_minus.gif")});$(".ping_toggle_all").toggle(function(){$("input.ping_toggle").each(function(){this.checked=false})},function(){$("input.ping_toggle").each(function(){this.checked=true})});if(EE.user.can_edit_html_buttons){$(".markItUp ul").append('<li class="btn_plus"><a title="'+EE.lang.add_new_html_button+'" href="'+EE.BASE+"&C=myaccount&M=html_buttons&id="+
EE.user_id+'">+</a></li>');$(".btn_plus a").click(function(){return confirm(EE.lang.confirm_exit,"")})}$(".markItUpHeader ul").prepend('<li class="close_formatting_buttons"><a href="#"><img width="10" height="10" src="'+EE.THEME_URL+'images/publish_minus.gif" alt="Close Formatting Buttons"/></a></li>');$(".close_formatting_buttons a").toggle(function(){$(this).parent().parent().children(":not(.close_formatting_buttons)").hide();$(this).parent().parent().css("height","13px");$(this).children("img").attr("src",
EE.THEME_URL+"images/publish_plus.png")},function(){$(this).parent().parent().children().show();$(this).parent().parent().css("height","22px");$(this).children("img").attr("src",EE.THEME_URL+"images/publish_minus.gif")});$(".tab_menu li:first").addClass("current");EE.publish.title_focus==true&&$("#title").focus();EE.publish.which=="new"&&$("#title").bind("keyup blur",liveUrlTitle);EE.publish.versioning_enabled=="n"?$("#revision_button").hide():$("#versioning_enabled").click(function(){$(this).attr("checked")?
$("#revision_button").show():$("#revision_button").hide()});EE.publish.category_editor()});
