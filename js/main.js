// Avoiding page refresh
window.addEventListener("beforeunload", function(e) {
  // Cancel the event
  e.preventDefault();
  // Chrome requires returnValue to be set
  e.returnValue = "";
});
////////////// END //////////////

// Creating log and sending to clipboard
const form = document.getElementById("formTool");
form.addEventListener("submit", function(e) {
  e.preventDefault();

  let logToClipboard = document.getElementById("logToClipboard");

  var nf = "";
  var backup = "";
  var outrasFalhas = "";

  if($('#falhaAdicional').is(':checked')){
    outrasFalhas = "No additional failure"
  }

  if($('#backup').is(':checked')){
    backup = "Aware of backup."
  }

  if($('#nf').is(':checked')){
    nf = "Invoice attached."
  }

  var verificacoes = `${outrasFalhas}
${backup}
${nf}`;

  const log = `ISSUE:
${issue.value}
__________________________
TROUBLESHOOT:
${verificacoes}
-------------------------
${troubleshooting.value}
__________________________
ACTION PLAN:
${actionPlan.value}
__________________________
CONCLUSION:
${conclusions.value}
__________________________
DISPATCH HISTORY:
${historyDPS.value}`;

  logToClipboard.innerHTML = log;
  $("#logToClipboard").select();
  // document.execCommand('copy');

  if (document.execCommand("copy")) {
    document.getElementById("alertCopied").classList.remove("d-none");

    setTimeout(function() {
      document.getElementById("alertCopied").classList.add("d-none");
    }, 3000);
  }
});
////////////// END //////////////

// Open OKB on a new tab
function openOKB(urlParam = "") {
  var okb_selected = document.getElementById("okb_selected").value;

  if (okb_selected != 0 && urlParam == "") {
    var url = `https://kb.dell.com/infocenter/index?page=content&id=${okb_selected}&viewlocale=pt_PT`;
    window.open(url, "_blank");

    document.getElementById("okb").value = okb_selected;
    insertOkbToLog();

    document.getElementById("okb_selected").selectedIndex = 0;
  } else if (okb_selected == 0 && urlParam != "") {
    var url = `https://kb.dell.com/infocenter/index?page=content&id=${urlParam}&viewlocale=pt_PT`;
    window.open(url, "_blank");
  }
}
////////////// END //////////////

// Insert the OKB within log
function insertOkbToLog() {
  var okbUsed = document.getElementById("okb");
  var troubleshooting = document.getElementById("troubleshooting");

  if (okbUsed.value != "") {
    var string = `OKB ${okbUsed.value}\n`;
    troubleshooting.value += string;
    openOKB(okbUsed.value);
    document.getElementById("okb").value = "";
  }
}
////////////// END //////////////


// OS IMAGE Function
const osForm = document.getElementById("osForm");
osForm.addEventListener("submit", function(e) {
  e.preventDefault();

  let logOsToClipboard = document.getElementById("logOsToClipboard");

  let osLog ='OS Download: ' + $("#arq").val() +', Language: ' + $("#ling").val() +', Model: ' + $("#model").val() +', OS: '+ $("#system").val();

    logOsToClipboard.innerHTML = osLog;
  $("#logOsToClipboard").select();

  if (document.execCommand("copy")) {
    document.getElementById("alertCopiedOsImage").classList.remove("d-none");

    setTimeout(function() {
      document.getElementById("alertCopiedOsImage").classList.add("d-none");
    }, 3000);
  }

  // Clean the form after copy to clipboard.
  $('#osForm').each (function(){
    this.reset();
  });
});

// CPF Function
const formCpf = document.getElementById("formCpf");
formCpf.addEventListener("submit", function(e) {
  e.preventDefault();

  let logCPFToClipboard = document.getElementById("logCPFToClipboard");

  let cpfLog;

  if( $('#ckbCpf').is(':checked') && $('#partsOnly').is(':checked') ){
    cpfLog = "FEDERAL:" + $("#cpfField").val() + "-STATE:ISENTO-BDATE:" + $("#bdate").val();
  }

  if( $('#ckbCpf').is(':checked') && !$('#partsOnly').is(':checked') ){
    cpfLog = "CPF:" + $("#cpfField").val() + "-BDATE:" + $("#bdate").val();
  }

  if( !$('#ckbCpf').is(':checked') && !$('#partsOnly').is(':checked') ){
    cpfLog = "FEDERAL:" + $("#cpfField").val() + "-STATE:" + $("#ie").val();
  }

  if( !$('#ckbCpf').is(':checked') && $('#partsOnly').is(':checked') ){
    cpfLog = "FEDERAL:" + $("#cpfField").val() + "-STATE:" + $("#ie").val() + "-";
  }

  logCPFToClipboard.innerHTML = cpfLog;
  $("#logCPFToClipboard").select();

  if (document.execCommand("copy")) {
    document.getElementById("alertCopiedcpf").classList.remove("d-none");

    setTimeout(function() {
      document.getElementById("alertCopiedcpf").classList.add("d-none");
    }, 3000);
  }

  // Clean the form after copy to clipboard.
  $('#formCpf').each (function(){
    this.reset();
  });  

});