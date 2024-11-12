import toast from "react-hot-toast"
import btc from '../assets/dashbaord/btc.png'
import eth from '../assets/dashbaord/eth.png'
import usdt from '../assets/dashbaord/usdt.png'

export const errorMessage = (message) => {
    return toast.error(message, {
        duration: 4000,
        position: "top-center"
    })
}
export const successMessage = (message) => {
    return toast.success(message, {
        duration: 4000,
        position: "top-center",

    })
}

export const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
})



 export const homepageHeaders = [
    {
        title:'Home',
        url:'/'
    },
    {
        title:'Product',
        url:'/product'
    },
    {
        title:'About Us',
        url:'/about'
    },
    {
        title:'Contact Us',
        url:'/contact'
    },
 ]

export const alltransactions = [
    {
        type: 'deposit',
        amount: '200',
        date: '22 Feb 2024',
        status: 'completed',
        get desc() {
            return `Your deposit of $${this.amount} is marked as completed, kindly check your balance.`;
        },
        id: 2
    },
    {
        type: 'withdrawal',
        amount: '100',
        date: '20 Feb 2024',
        status: 'pending',
        get desc() {
            return `Your deposit of $${this.amount} is marked as ${this.status}, kindly wait for approval.`;
        },
        id: 3
    },
    {
        type: 'deposit',
        amount: '200',
        date: '20 March 2024',
        status: 'declined',
        get desc() {
            return `Your deposit of $${this.amount} is marked as ${this.status}, kindly check notifications or email to find out more about your failed transaction.`;
        },
        id: 4
    },
    {
        type: 'Plan Purchase',
        amount: '500',
        date: '11 July 2024',
        status: 'completed',
        get desc() {
            return `Your plan purchase of $${this.amount} is marked as ${this.status}, kindly check your balance.`;
        },
        id: 5
    },
    {
        type: 'deposit',
        amount: '200',
        date: '22 Feb 2024',
        status: 'completed',
        get desc() {
            return `Your deposit of $${this.amount} is marked as completed, kindly check your balance.`;
        },
        id: 2
    },
    {
        type: 'withdrawal',
        amount: '100',
        date: '20 Feb 2024',
        status: 'pending',
        get desc() {
            return `Your deposit of $${this.amount} is marked as ${this.status}, kindly wait for approval.`;
        },
        id: 3
    },
    {
        type: 'deposit',
        amount: '200',
        date: '20 March 2024',
        status: 'declined',
        get desc() {
            return `Your deposit of $${this.amount} is marked as ${this.status}, kindly check notifications or email to find out more about your failed transaction.`;
        },
        id: 4
    },
    {
        type: 'Plan Purchase',
        amount: '500',
        date: '11 July 2024',
        status: 'completed',
        get desc() {
            return `Your plan purchase of $${this.amount} is marked as ${this.status}, kindly check your balance.`;
        },
        id: 5
    }
]


export const walletsAdd = [
    {
        title:'Bitcoin',
        img:btc
    },
    {
        title:'Ethereum',
        img:eth,
      
    },
    {
        title:'Usdt',
        img:usdt,
       
    },
    {
        title:'Bitcoin',
        img:btc
    },
    {
        title:'Ethereum',
        img:eth,
      
    },
    {
        title:'Usdt',
        img:usdt,
       
    },
]

export const footerHeaders = [
    {
        title:'About',
        links:[
            {
                title:'About Us',
                url:''
            },
            {
                title:'Careers',
                url:''
            },
            {
                title:'Jobs',
                url:''
            },
            {
                title:'In Press',
                url:''
            },

        ]
    },
    {
        title:'Support',
        links:[
            {
                title:'Contact Us',
                url:''
            },
            {
                title:'Online chat',
                url:''
            },
            {
                title:'WhatsApp',
                url:''
            },
            {
                title:'Telegram',
                url:''
            },

        ]
    },
    {
        title:'FAQ',
        links:[
            {
                title:'Account',
                url:''
            },
            {
                title:'Orders',
                url:''
            },
            {
                title:'Payments',
                url:''
            },
            {
                title:'Returns',
                url:''
            },

        ]
    },
]

export const numbers = [
    {
        amt:1,
        title:''
    },
    {
        amt:1.2,
        title:'Annual ROI'
    },
    {
        amt:100,
        title:'Countries'
    },
    {
        amt:142,
        title:'Raised Capital'
    },
]