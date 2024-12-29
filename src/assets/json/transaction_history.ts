import receive from '@app/assets/images/receive.png'
import send from '@app/assets/images/sent.png'
import contract from '@app/assets/images/contract.png'


export const transaction_history = [
    {
        statusText: 'Received BNB',
        status: 'Pending',
        amount: '0.04',
        currency: '9.58',
        src: receive,
        date: 'Mar 3 at 10:04am'
    },
    {
        statusText: 'Send BNB',
        status: 'Failed',
        amount: '0.04',
        currency: '9.58',
        src: send,
        date: 'Mar 3 at 10:04am'

    },
    {
        statusText: 'Smart Contract Call',
        status: 'To: 0x059951...9930bbd5',
        amount: '0.04',
        currency: '9.58',
        src: contract,
        date: 'Mar 3 at 10:04am'
    },
    {
        statusText: 'Received BNB',
        status: 'Confirmed',
        amount: '0.04',
        currency: '9.58',
        src: receive,
        date: 'Mar 3 at 10:04am'

    }
]