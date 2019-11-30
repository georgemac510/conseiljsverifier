const serverInfo = {
    url: 'https://conseil-dev.cryptonomic-infra.tech:443',
    apiKey: 'b9labs'
};

function updateStatusUI(message,status, itemSelector) {
  const bar = $(itemSelector).removeClass().addClass("result-bar");

  if (status == "loading") {
    bar.addClass("result-load").html("Loading...");
  } else if (status == "True") {
    bar.addClass("result-true").html("Name: " + message);
  } else if (status == "False") {
    bar.addClass("result-false").html(message);
  } else {
    bar.addClass("result-false").html("Error: " + message);
  }
}


function getCertStatus(contractAddress, inputId, outputId) {
  updateStatusUI("loading","loading", outputId);

  return conseiljs.TezosConseilClient.getAccount(serverInfo, 'babylonnet', contractAddress)
    .then(account => {
      contractStorage= account[0].storage.split('{')[1].split('}')[0].split('Elt');
      let students = [];

      for(let i = 1; i < contractStorage.length; i++) {
        students.push([contractStorage[i].split('"')[1],contractStorage[i].split('"')[3]]);
        }

      console.log(JSON.stringify(contractStorage, null, 4));
      const inputVal = $(inputId).val();

      const found = students.find(student => student[0] == inputVal);

      if(found !== undefined) {
        updateStatusUI(found[1], 'True', outputId);
      } else {
        updateStatusUI("student not found", "False", outputId);
      }
    })
    .catch(e => {
      updateStatusUI(e,e, outputId);
      console.error(e);
    });
}
