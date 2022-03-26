function clearForm() {
    //clears form values
    document.getElementById('rua').value = ("");
    document.getElementById('bairro').value = ("");
    document.getElementById('cidade').value = ("");
    document.getElementById('uf').value = ("");
}

// Funtion to remove special caracteres - Not finished
function removeSpecialCaracter(word) {
    word = word.replace("/[óòõôö]/gi", "o");
    console.log(word);
    return word;
}

function callback(content) {
    if (!("erro" in content)) {
        //Updates the fields with the returned values.
        document.getElementById('rua').value = (content.logradouro);
        document.getElementById('bairro').value = (content.bairro);
        document.getElementById('cidade').value = (removeSpecialCaracter(content.localidade));
        document.getElementById('uf').value = (content.uf);
    } //end if.
    else {
        //CEP not found.
        clearForm();
        alert("CEP não encontrado.");
    }
}

function searchCEP(value) {

    //Remove . and -
    var cep = value.replace(/\D/g, '');

    //Make sure the Zip Code field has the value entered.
    if (cep != "") {

        //Regular expression to validate the CEP.
        var validacep = /^[0-9]{8}$/;

        //Validate the CEP format.
        if (validacep.test(cep)) {

            //Fill in the fields with "..." while browsing webservice.
            document.getElementById('rua').value = "...";
            document.getElementById('bairro').value = "...";
            document.getElementById('cidade').value = "...";
            document.getElementById('uf').value = "...";

            //Create a javascript element.
            var script = document.createElement('script');

            //Synchronize with the callback.
            script.src = 'https://viacep.com.br/ws/' + cep + '/json/?callback=callback';

            //Insere script no documento e carrega o conteúdo.
            document.body.appendChild(script);

        } //end if.
        else {
            //Invalid CEP.
            clearForm();
            alert("Formato de CEP inválido.");
        }
    } //end if.
    else {
        //Without value, clear form.
        clearForm();
    }
};