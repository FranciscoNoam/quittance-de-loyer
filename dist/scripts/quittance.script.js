var _0x1e323d=_0x3143;(function(_0x507845,_0x5a5149){var _0x12ea5f=_0x3143,_0x5fc150=_0x507845();while(!![]){try{var _0x25112a=-parseInt(_0x12ea5f(0x102))/0x1*(-parseInt(_0x12ea5f(0xcf))/0x2)+parseInt(_0x12ea5f(0xea))/0x3*(parseInt(_0x12ea5f(0xe9))/0x4)+-parseInt(_0x12ea5f(0xbf))/0x5+parseInt(_0x12ea5f(0xfc))/0x6+-parseInt(_0x12ea5f(0xe1))/0x7*(-parseInt(_0x12ea5f(0xf9))/0x8)+-parseInt(_0x12ea5f(0xd5))/0x9+parseInt(_0x12ea5f(0xf3))/0xa*(-parseInt(_0x12ea5f(0xf2))/0xb);if(_0x25112a===_0x5a5149)break;else _0x5fc150['push'](_0x5fc150['shift']());}catch(_0x352caf){_0x5fc150['push'](_0x5fc150['shift']());}}}(_0x245e,0xca0ea));function _0x245e(){var _0x45b33b=['pages/components/quittance/quittance.ejs','642465gFYtPw','#contentWrapper','\x20<p>\x20avec\x20une\x20surface\x20de\x20','style','bien','stringify','#list_bien','\x20AR','message','<option\x20value=\x22','render','html','facture/','find','</option>','.result_montant_ttc','8336hvGIXA','get','surface','pages/components/quittance/index.ejs','\x20</p>','#tva','8849394jXMIri','#deletequittance','pages/components/quittance/nouveau_quittance.ejs','#type_paiements','#list-quinttage','getElementById','json','#total_tva','/detail-quittance/','#total_ht',':selected','catch','5688151BBZokA','#invoice_date','status','empty','#close-modal-delete-quittance','value','text','#locataire_id_list','932ZSCbil','9054zyQPWN','POST','quittanceiddelete','/locataire/','dataTable','/type_paiements','/locataires/','none','1136498vHkEUl','190qbCMfZ','#pu','ajax','name','loading_page','DELETE','16HSTIDE','[name=\x22pu[]\x22]','val','141306UaUMTR','#total_charge','Donnée\x20invalide','#token_','#charge','/factures/','372QuygOk','#table_appartement','#form-bon-commande\x20tr','/send-mail-locataire/','.result_montant','/facture/','#quittanceiddelete','GET','application/json','#ref','[name=\x22tva[]\x22]','#month_rental','[name=\x22charge[]\x22]','click','block','display','#name_appartement'];_0x245e=function(){return _0x45b33b;};return _0x245e();}async function loadquittance(_0x262231){var _0x256990=_0x3143;const _0x5c7cb4=await fetch(_0x256990(0x101)+_0x262231,{'method':_0x256990(0xb4)}),_0x20b808=await _0x5c7cb4[_0x256990(0xdb)]();$[_0x256990(0xd0)](_0x256990(0xd2),function(_0x4e678b){var _0x11867c=_0x256990;const _0x52f871=ejs[_0x11867c(0xc9)](_0x4e678b,{'listes':_0x20b808});$(_0x11867c(0xc0))[_0x11867c(0xe4)](),$(_0x11867c(0xc0))[_0x11867c(0xca)](_0x52f871),$(_0x11867c(0x103))[_0x11867c(0xee)](),document[_0x11867c(0xda)](_0x11867c(0xf7))[_0x11867c(0xc2)][_0x11867c(0xbc)]=_0x11867c(0xf1);});}async function refreshquittance(_0x34d2bb){var _0x4d4084=_0x3143;const _0x57c6a4=await fetch(_0x4d4084(0x101)+_0x34d2bb,{'method':'GET'}),_0x259271=await _0x57c6a4[_0x4d4084(0xdb)]();$[_0x4d4084(0xd0)](_0x4d4084(0xbe),function(_0x2d76c5){var _0x37cb56=_0x4d4084;const _0x25f59c=ejs[_0x37cb56(0xc9)](_0x2d76c5,{'listes':_0x259271});$('#list-quinttage')[_0x37cb56(0xe4)](),$(_0x37cb56(0xd9))[_0x37cb56(0xca)](_0x25f59c),$(_0x37cb56(0x103))[_0x37cb56(0xee)](),document[_0x37cb56(0xda)](_0x37cb56(0xf7))[_0x37cb56(0xc2)][_0x37cb56(0xbc)]=_0x37cb56(0xf1);});}async function newquittance(){var _0x39a8ec=_0x3143;document[_0x39a8ec(0xda)](_0x39a8ec(0xf7))[_0x39a8ec(0xc2)][_0x39a8ec(0xbc)]=_0x39a8ec(0xbb);const _0x1aeccc=await fetch(_0x39a8ec(0xf0)+$(_0x39a8ec(0xff))['val'](),{'method':_0x39a8ec(0xb4)}),_0x241cd3=await _0x1aeccc[_0x39a8ec(0xdb)](),_0x3d2262=await fetch(_0x39a8ec(0xef),{'method':_0x39a8ec(0xb4)}),_0x28d9ce=await _0x3d2262['json']();$[_0x39a8ec(0xd0)](_0x39a8ec(0xd7),function(_0x56c8c8){var _0x4824c0=_0x39a8ec;const _0x4cd1d5=ejs['render'](_0x56c8c8,{'paiements':_0x28d9ce,'locataires':_0x241cd3});$(_0x4824c0(0xc0))[_0x4824c0(0xe4)](),$(_0x4824c0(0xc0))[_0x4824c0(0xca)](_0x4cd1d5),document[_0x4824c0(0xda)](_0x4824c0(0xf7))[_0x4824c0(0xc2)]['display']=_0x4824c0(0xf1);});}function _0x3143(_0x420d06,_0x23d36d){var _0x245e4b=_0x245e();return _0x3143=function(_0x3143e5,_0x24ca80){_0x3143e5=_0x3143e5-0xb0;var _0x4c2082=_0x245e4b[_0x3143e5];return _0x4c2082;},_0x3143(_0x420d06,_0x23d36d);}async function get_appartement(){var _0x832b6d=_0x3143;const _0x622ff3=await fetch(_0x832b6d(0xed)+$(_0x832b6d(0xe8))['find'](_0x832b6d(0xdf))[_0x832b6d(0xfb)](),{'method':_0x832b6d(0xb4)}),_0x2ef9ae=await _0x622ff3['json']();if(_0x2ef9ae){var _0x2a9963='';_0x2a9963+=_0x832b6d(0xc8)+_0x2ef9ae['bien']['_id']+'\x22>'+_0x2ef9ae[_0x832b6d(0xc3)][_0x832b6d(0xf6)]+_0x832b6d(0xcd),$(_0x832b6d(0xc5))[_0x832b6d(0xe4)](),$(_0x832b6d(0xc5))[_0x832b6d(0xca)](_0x2a9963);var _0x3f49ed='';_0x3f49ed+=_0x2ef9ae[_0x832b6d(0xc3)]['name'],_0x3f49ed+=_0x832b6d(0xc1)+_0x2ef9ae['bien'][_0x832b6d(0xd1)]+_0x832b6d(0xd3),$(_0x832b6d(0xbd))[_0x832b6d(0xe4)](),$(_0x832b6d(0xbd))[_0x832b6d(0xca)](_0x3f49ed),$(_0x832b6d(0xf4))['val'](_0x2ef9ae[_0x832b6d(0xc3)]['loyer']),calcule_tarif();}}function calcule_tarif(){var _0x213ed9=_0x3143,_0x35c1dc=0x0,_0x2b8665=0x0,_0xe3ea57=0x0,_0x1ec14c=0x0;$(_0x213ed9(0x104))['each'](function(){var _0x1b25d7=_0x213ed9,_0x56e24a=parseFloat($(this)['find'](_0x1b25d7(0xfa))[_0x1b25d7(0xfb)]())||0x0,_0x516e35=parseFloat($(this)[_0x1b25d7(0xcc)](_0x1b25d7(0xb9))[_0x1b25d7(0xfb)]())||0x0,_0x4191fd=_0x516e35+_0x56e24a,_0x5912be=_0x4191fd;_0x5912be=_0x5912be<=0x0?0x0:_0x5912be;var _0x2e54fc=parseFloat($(this)[_0x1b25d7(0xcc)](_0x1b25d7(0xb7))['val']())||0x0,_0x10082d=_0x5912be*_0x2e54fc/0x64;_0x10082d=_0x10082d<=0x0?0x0:_0x10082d;var _0x53f580=_0x5912be+_0x10082d;_0x35c1dc+=_0x5912be,_0x2b8665+=_0x516e35,_0xe3ea57+=_0x10082d,_0x1ec14c+=_0x53f580,$(this)[_0x1b25d7(0xcc)](_0x1b25d7(0xb1))[_0x1b25d7(0xe7)](_0x5912be+_0x1b25d7(0xc6)),$(this)[_0x1b25d7(0xcc)](_0x1b25d7(0xce))['text'](_0x53f580+_0x1b25d7(0xc6));}),$(_0x213ed9(0xde))[_0x213ed9(0xca)](_0x35c1dc+_0x213ed9(0xc6)),$(_0x213ed9(0xfd))[_0x213ed9(0xca)](_0x2b8665+_0x213ed9(0xc6)),$(_0x213ed9(0xdc))[_0x213ed9(0xca)](_0xe3ea57+_0x213ed9(0xc6)),$('#total_ttc')[_0x213ed9(0xca)](_0x1ec14c+'\x20AR');}function save_quittance(){var _0x329879=_0x3143;document[_0x329879(0xda)](_0x329879(0xf7))[_0x329879(0xc2)]['display']=_0x329879(0xbb);var _0x2af499={'ref':$(_0x329879(0xb6))[_0x329879(0xfb)](),'charge':$(_0x329879(0x100))[_0x329879(0xfb)](),'invoice_date':$(_0x329879(0xe2))[_0x329879(0xfb)](),'due_date':$('#due_date')[_0x329879(0xfb)](),'month_rental':$(_0x329879(0xb8))[_0x329879(0xfb)](),'pu':$(_0x329879(0xf4))[_0x329879(0xfb)](),'tva':$(_0x329879(0xd4))[_0x329879(0xfb)](),'type_paiement':$(_0x329879(0xd8))[_0x329879(0xcc)](':selected')[_0x329879(0xfb)](),'bien':$(_0x329879(0xc5))[_0x329879(0xcc)](_0x329879(0xdf))[_0x329879(0xfb)](),'locataire':$(_0x329879(0xe8))[_0x329879(0xcc)](_0x329879(0xdf))[_0x329879(0xfb)]()};$[_0x329879(0xf5)]({'type':'POST','url':_0x329879(0xb2)+$(_0x329879(0xff))[_0x329879(0xfb)](),'data':_0x2af499,'dataType':'json','success':function(_0x2d07af){var _0x2705f4=_0x329879;_0x2d07af[_0x2705f4(0xe3)]==0xc8?(document[_0x2705f4(0xda)](_0x2705f4(0xf7))[_0x2705f4(0xc2)][_0x2705f4(0xbc)]=_0x2705f4(0xf1),actionmen(this,ElMenuBien,ElMenuLocataire),loadquittance($(_0x2705f4(0xff))['val']())):(document['getElementById'](_0x2705f4(0xf7))['style']['display']=_0x2705f4(0xf1),toastError(_0x2d07af['message']));},'error':function(_0x24b278){var _0x2d60a8=_0x329879;document[_0x2d60a8(0xda)](_0x2d60a8(0xf7))[_0x2d60a8(0xc2)][_0x2d60a8(0xbc)]=_0x2d60a8(0xf1),toastError(_0x24b278['message']);}});}function sendEmail(_0x4c32fc){var _0xb2e11a=_0x3143;document[_0xb2e11a(0xda)](_0xb2e11a(0xf7))['style'][_0xb2e11a(0xbc)]=_0xb2e11a(0xbb),$['ajax']({'type':_0xb2e11a(0xb4),'url':_0xb2e11a(0xdd)+_0x4c32fc,'success':function(_0x32509a){var _0x295d41=_0xb2e11a;const _0x51fbb0=_0x32509a;$[_0x295d41(0xf5)]({'type':_0x295d41(0xeb),'url':_0x295d41(0xb0)+_0x4c32fc,'data':{'htmlContent':_0x51fbb0},'success':function(_0x55aac9){var _0x5222d5=_0x295d41;document[_0x5222d5(0xda)](_0x5222d5(0xf7))['style'][_0x5222d5(0xbc)]=_0x5222d5(0xf1),_0x55aac9['status']==0xc8?toastSuccess(_0x55aac9[_0x5222d5(0xc7)]):toastError(_0x55aac9['message']);},'error':function(_0x5177bf){var _0x227305=_0x295d41;document[_0x227305(0xda)](_0x227305(0xf7))['style'][_0x227305(0xbc)]=_0x227305(0xf1),toastError(_0x5177bf[_0x227305(0xc7)]);}});},'error':function(_0x183fa5){var _0x471dd5=_0xb2e11a;document[_0x471dd5(0xda)](_0x471dd5(0xf7))[_0x471dd5(0xc2)][_0x471dd5(0xbc)]=_0x471dd5(0xf1),toastError(_0x183fa5['message']);}});}function show_modal_delete_quittance(_0x261c1e){var _0x4cb0d2=_0x3143;document[_0x4cb0d2(0xda)](_0x4cb0d2(0xec))['setAttribute'](_0x4cb0d2(0xe6),_0x261c1e);}$(_0x1e323d(0xd6))['on']('click',function(){var _0x4e32eb=_0x1e323d;document[_0x4e32eb(0xda)](_0x4e32eb(0xf7))[_0x4e32eb(0xc2)][_0x4e32eb(0xbc)]=_0x4e32eb(0xbb);if($(_0x4e32eb(0xb3))[_0x4e32eb(0xfb)]()!=null&&$(_0x4e32eb(0xb3))[_0x4e32eb(0xfb)]()!=''){var _0x9418fd=_0x4e32eb(0xcb)+$(_0x4e32eb(0xb3))[_0x4e32eb(0xfb)]();fetch(_0x9418fd,{'method':_0x4e32eb(0xf8),'headers':{'Content-Type':_0x4e32eb(0xb5)},'body':JSON[_0x4e32eb(0xc4)]({})})['then'](_0x9defc2=>{var _0x1bf44e=_0x4e32eb;if(_0x9defc2['ok'])return _0x9defc2[_0x1bf44e(0xdb)]();})['then'](_0x519e6e=>{var _0x13f584=_0x4e32eb;_0x519e6e[_0x13f584(0xe3)]==0xc8?(toastSuccess(_0x519e6e[_0x13f584(0xc7)]),$(_0x13f584(0xe5))[_0x13f584(0xba)](),refreshquittance($('#token_')['val']())):(toastError(_0x519e6e['message']),document[_0x13f584(0xda)](_0x13f584(0xf7))['style']['display']=_0x13f584(0xf1));})[_0x4e32eb(0xe0)](_0x423ddb=>{var _0x55ca7f=_0x4e32eb;toastError(_0x423ddb['message']),document[_0x55ca7f(0xda)]('loading_page')[_0x55ca7f(0xc2)][_0x55ca7f(0xbc)]=_0x55ca7f(0xf1);});}else toastError(_0x4e32eb(0xfe)),document[_0x4e32eb(0xda)](_0x4e32eb(0xf7))['style'][_0x4e32eb(0xbc)]=_0x4e32eb(0xf1);});