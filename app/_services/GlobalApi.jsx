import axios from "axios";


const token = process.env.NEXT_PUBLIC_BUY_ME_COFFEE; // Replace with your actual bearer token
const apiUrl = 'https://developers.buymeacoffee.com/api/v1/subscriptions?status=active&page='; // Replace with the API endpoint URL

const headers = {
  'Authorization': `Bearer ${token}`,
  'Content-Type': 'application/json' // Adjust content type if needed
};


const getUserSubscription=(pageNumber)=> axios.get(apiUrl+pageNumber, { headers })

const getAllSubscription=(url)=>axios.get(apiUrl,{ headers })

export default{
    getUserSubscription,
    getAllSubscription
}