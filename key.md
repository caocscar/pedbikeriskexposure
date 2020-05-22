`cmisst-web.miserver.it.umich.edu`  
`cd ssl`  
`openssl req -nodes -newkey rsa:2048 -keyout pedbikerisk.key -out pedbikerisk.csr`  

Generating a 2048 bit RSA private key  
...+++  
....+++  
writing new private key to 'cmisst-web.key'  
-----
You are about to be asked to enter information that will be incorporated
into your certificate request.
What you are about to enter is what is called a Distinguished Name or a DN.
There are quite a few fields but you can leave some blank
For some fields there will be a default value,
If you enter '.', the field will be left blank.
-----
Country Name (2 letter code) [AU]:**US**  
State or Province Name (full name) [Some-State]:**Michigan**  
Locality Name (eg, city) []:**Ann Arbor**  
Organization Name (eg, company) [Internet Widgits Pty Ltd]:**University of Michigan**  
Organizational Unit Name (eg, section) []:**Information Technology Services**  
Common Name (e.g. server FQDN or YOUR name) []:**cmisst-web.miserver.it.umich.edu**  
Email Address []:.  

Please enter the following 'extra' attributes to be sent with your certificate request  
A challenge password []:.  
An optional company name []:.  

DONE! Copy new csr from `pedbikerisk.csr` to required field.
