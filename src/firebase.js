import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    
  "type": "service_account",
  "projectId": "appsamsung-ba30e",
  "private_key_id": "2caa2b3d1004de67e46c887c1abcc9758e564e78",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQDRtZ1Xq+eJDh9t\nTvOwwxmFlmIw4EgsnWoyIZy0iKrDafxOA3aa5W+U5BSbl80v2IKRIcCayysVxzbs\nziBm5xqViDSHmqiav33cg4VojXHhQbhVTwbEfzFPe05dbnHdqU1hF+l5iVe8myf1\nNKftnLQNVkqX2lsnZnuA66Yv546r5HH49mKLwoINk4OuloU8zKge0qDAyQ8Vcvnp\nk4QJ/jCYNsTfiTd1l9rraZi3RanqCDChznq+Aw79D6/KDh12AfdCnjPwy+jKfshv\n5cAcKhOgnChEzUPnyU9gNi8LNCBT3mpf/y6P7Fcf6sYF2uiS2vL1NJ6HtPd6jg4U\nTFsZU/AjAgMBAAECggEABh1snBzYIIf35KETvAjEWr/a1yADGsHwUcvnHOCLUi1p\n/QBe2f9stIO+EhdoFUgT7pV0X08jT3xCnr8X9MgyXz/cgEPDPNfunJp9LmJJes8G\nx/4I7Xvj/TRUQacxzMveBMHEvhWCKG7ByIWji+sw2N62SB1G4Sw817KHYwg2gc6W\n8PXGzYSXYBxbD/9z7Tg4z2EUFIsg3yS+TawhPKu7ivJkwE8NHl8pGi4UsKJNziha\nSHouELadaIB97Dvfw7q5Nj4vXuCB3sJU7RDJhxdPUVeCHywR5SecxJZbp26wzOKq\nNfUAayKA+oNK2Nt59hL0Ys5AdAYZ8x50QlNEe7LiEQKBgQD704CS4IE5ev2wCjFJ\n+eiCO8CSf2cPLx+H/YsyBVE1Pbg+EfIX/eJ9P695KMNXn1O97f/YT230YaBLv62U\nHZsUzTdpe6X0f1HmAi672c3/Q6e4n9V6ik74ydk8J77R/8GxCY598Q07ZUWU9lYD\nrKIGQGr7qvChMbPOd7MnknwGGQKBgQDVL2lAKDAmlhqxb0cZrk7pQYc10xrPgNW6\nvcIAuwBG81pDdd9FUm4I9i9bV3OpK70YtANXsiRK0U0KMHMF+4BYWVm25BWlFjvL\n3q7D+V9fsi1xBt4w4xpurHMnbe2ScAw73di6P14WouXYwpT+aYQD6eKEryVUHJdZ\n5c4B9zAXmwKBgGh/NHw+UwFCKyEwqZFT9YqNNvTTjzV6zW/F40vnbvJT4S9IjRgt\njx2AHtV898pVYA+RQjhFhZACLt0f9exfeKniGltYJt5VMuvp/fCPie6h6WgwUwqd\nd/W+9LkEmSdVJM/M8mcKbv41oPEWY0z1BurnMj2qil2pXT6Q5zPFkleJAoGAWwkd\n9umydifPSknsoMjQpcb3yEJXxpiLrGzv9YPlgGbW+svRBjdHCcinPGhB2dH1tCDa\n9I379X8fWOSLmdhmXFP7faA0pgSykEKNet54ndLmmMeIBnRUi0JVAldtBgWXE9GO\nhSoeMahqYn/lRCcm2sz7kBGC7UIwV5FMwYYfIVUCgYAHY51S+YyrexhdWDpvE1Jt\nSBN4cTYlAYg0UYO4MFKNtDIvviHglWNYaEaTWagJoxyl6uG0oTdR693gvk+HH3ah\n9jEy0HfQT6CkivaxdqkMCXaHU4+YRlvEjaZBXUQw9+/x9NW+G8Y1P+4pJEyDVWkE\nwrytvS+xSSO3brR0hZMUNA==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@appsamsung-ba30e.iam.gserviceaccount.com",
  "client_id": "112604178464137110887",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40appsamsung-ba30e.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"


};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app); 