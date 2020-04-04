let stateNumber = 1;
const apiKey = 'XD7n0ZmrBDt9KD6eEyvkeglyEX0ialTbT7ftA9u1';


function addDropdown() {
    $('#addState').click(event => {
        $('#dropdown').append(`<select id="state${stateNumber}" name="state${stateNumber}"><option value="AL">Alabama</option><option value="AK">Alaska</option><option value="AZ">Arizona</option><option value="AR">Arkansas</option><option value="CA">California</option><option value="CO">Colorado</option><option value="CT">Connecticut</option><option value="DE">Delaware</option><option value="FL">Florida</option><option value="GA">Georgia</option><option value="HI">Hawaii</option><option value="ID">Idaho</option><option value="IL">Illinois</option><option value="IN">Indiana</option><option value="IA">Iowa</option><option value="KS">Kansas</option><option value="KY">Kentucky</option><option value="LA">Louisiana</option><option value="ME">Maine</option><option value="MD">Maryland</option><option value="MA">Massachusetts</option><option value="MI">Michigan</option><option value="MN">Minnesota</option><option value="MS">Mississippi</option><option value="MO">Missouri</option><option value="MT">Montana</option><option value="NE">Nebraska</option><option value="NV">Nevada</option><option value="NH">New Hampshire</option><option value="NJ">New Jersey</option><option value="NM">New Mexico</option><option value="NY">New York</option><option value="NC">North Carolina</option><option value="ND">North Dakota</option><option value="OH">Ohio</option><option value="OK">Oklahoma</option><option value="OR">Oregon</option><option value="PA">Pennsylvania</option><option value="RI">Rhode Island</option><option value="SC">South Carolina</option><option value="SD">South Dakota</option><option value="TN">Tennessee</option><option value="TX">Texas</option><option value="UT">Utah</option><option value="VT">Vermont</option><option value="VA">Virginia</option><option value="WA">Washington</option><option value="WV">West Virginia</option><option value="WI">Wisconsin</option><option value="WY">Wyoming</option></select>`)
        stateNumber++;
    });
}

function minusDropdown() {
    $('#minusState').click(event => {
        $(`#state${stateNumber}`).remove();
        if(stateNumber !== 1){
            stateNumber--;
        }
    });
}
/*


    Best attempt at address left in comments


function getAddress(responseJson,maxResults) {
    let address = [];
    for(i=0;i<maxResults;i++){
        if ((responseJson).includes(responseJson.data[i].addresses[1].line1)) {
        address[i] = `${responseJson.data[i].addresses[1].line1}`+`${responseJson.data[i].addresses[1].line2}`+`${responseJson.data[i].addresses[1].line3}`+`${responseJson.data[i].addresses[1].city}, `+` ${responseJson.data[i].addresses[1].stateCode}`+`${responseJson.data[i].addresses[1].postalCode}`;
        }
        else {
            address[i] = 'No physical address listed';
        }
    }
    console.log(address);
    return address;
}
    //let address = [];
    //address = getAddress(responseJson,maxResults); <p>${address[i]}</p>
*/
function displayResults(responseJson,maxResults) {
    for(i=0;i<maxResults;i++){
        let header = `${responseJson.data[i].fullName}`;
        let desc = `${responseJson.data[i].description}`;
        let link = `${responseJson.data[i].url}`;
    $('#results').append(`<section><h3>${header}</h3><p>${desc}</p><a href='${link}' target='_blank'>${link}</a></section>`);
    }
}


function generateUrl(states,maxResults) {
    let url = 'https://developer.nps.gov/api/v1/parks?';
    url = url + 'stateCode=';
    for(i=0;i<stateNumber;i++) {
        url = url + `${states[i]}`;
        if (i<stateNumber-1) {
            url = url + ',';
        }
    }
    url = url + `&limit=${maxResults}&api_key=`+ apiKey;
    return url;
}

function getParks(states, maxResults) {  
    let url = '';
    url = generateUrl(states,maxResults);
    fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response);
    })
    .then(responseJson => displayResults(responseJson,maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchInput() {
    $('form').submit(event => {
        event.preventDefault();
        let states = [];
        for(i=0;i<stateNumber;i++){
            states[i] = $(`#state${i}`).val();
        }
        $('#results').empty();
        let maxResults = $('#number').val();
        getParks(states, maxResults);
    });
}

$(watchInput);
$(addDropdown);
$(minusDropdown);