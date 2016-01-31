# bbtrello
Bitbucket + Trello integration  
*Currently this only works with commit message*

**Setup**

- Configure Bitbucket repository setting to add a webhook  
https://bitbucket.org/[YOUR_PROJECT_NAME]/[YOUR_REPO_NAME]/admin/addon/admin/bitbucket-webhooks/bb-webhooks-repo-admin  
Point the URL to your bbtrello address, it needs to be public accessible  

- Download the bbtrello source code  
(Sorry I didn't make it a npm module yet)  

- Configure the setting file in `config.json`

- Start the server with `node server.js`

**How to use**

Write commit message like this  
- `[TRELLO_CARD_ID] I did something in the commit`  
- `[D2k8wWd] Update package.json`
- `[dw1kkVS] Fix a bug that will crash the app, [W2skAPd] Fix UI issue on home page`
  
It will send comment to cards like the following  
  
```
Philip Yu added a commit to branch testing
"[dw1kkVS] Fix a bug that will crash the app, [W2skAPd] Fix UI issue on home page"
https://bitbucket.org/[YOUR_PROJECT_NAME]/[YOUR_REPO_NAME]/commits/9aa4a77961232rhu3hjde3174691ea48a151985
```
  
**Security**
  
You might whitelist the following IP range from BitBucket  
(https://confluence.atlassian.com/bitbucket/manage-webhooks-735643732.html)  
131.103.20.160/27  
165.254.145.0/26  
104.192.143.0/24  
  
**Contribute**  
I'd love to include your contributions. Feel free to improve it, send comments or suggestions. Please let me know if you have great idea on it.
  
**Contact Me**  
You can reach on Facebook - http://www.facebook.com/seitkk or through ht.yu@me.com  
