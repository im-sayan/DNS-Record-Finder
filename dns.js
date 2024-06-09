const dns = require('dns');
const GeoIP = require("simple-geoip");

// Initialize the GeoIP object with your API key
const geoIP = new GeoIP("at_i0EX5kYIklGLF0ep9uKEWLMDzhzx4");
//https://ip-geolocation.whoisxmlapi.com/api/v1?apiKey=at_i0EX5kYIklGLF0ep9uKEWLMDzhzx4&ipAddress=8.8.8.8

const domainName = 'enter domain name';

dns.resolve(domainName, 'A', (err, addresses) => {
  if (err) {
    console.error(`Error resolving domain ${domainName}:`, err);
    return;
  }
  console.log(`IP addresses for ${domainName}:`, addresses);

  if (addresses.length > 0) {
    addresses.forEach(element => {
      geoIP.lookup(element, (err, data) => {
        if (err) {
          console.error("Error performing IP lookup:", err);
          return;
        }

        console.log("IP Lookup Result:", data);
      });
    });
  }
});

dns.resolveMx(domainName, (err, mxRecords) => {
  if (err) {
    if (err.code === 'ENODATA') {
      console.log(`No MX records found for ${domainName}`);
    } else {
      console.error(`Error resolving MX records for ${domainName}:`, err);
    }
    return;
  }
  console.log(`MX records for ${domainName}:`, mxRecords);
});

dns.resolveNs(domainName, (err, nsRecords) => {
  if (err) {
    if (err.code === 'ENODATA') {
      console.log(`No NS records found for ${domainName}`);
    } else {
      console.error(`Error resolving NS records for ${domainName}:`, err);
    }
    return;
  }
  console.log(`NS records for ${domainName}:`, nsRecords);
});