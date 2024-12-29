import mastercard from '@app/assets/images/mastercard.png'
import visa from '@app/assets/images/visa.png'

export const cards = [
    {
        id: 1001,
        label: 'Mastercard',
        code: '****9382',
        fullCode: '4000 1234 5678 9622',
        src: mastercard,
        owner: 'Jane Cooper',
        expireDate: '01/25',
        cvv: '345',
        billAddress: '19277 110th Ave',
        postalCode: '11413-4010',
        city: 'Istanbul',
        state: "Istanbul",
        country: "Turkey"
    },
    {
        id: 1002,
        label: 'Visa',
        code: '****8371',
        fullCode: '4000 1234 5678 8371',
        src: visa,
        owner: 'Jane Gooper',
        expireDate: '01/25',
        cvv: '345',
        billAddress: '19277 110th Ave',
        postalCode: '11413-4010',
        city: 'Istanbul',
        state: "Istanbul",
        country: "Turkey"
    },
    {
        id: 1003,
        label: 'Visa',
        code: '****6251',
        fullCode: '4000 1234 5678 6251',
        src: visa,
        owner: 'Jane Booper',
        expireDate: '01/25',
        cvv: '345',
        billAddress: '19277 110th Ave',
        postalCode: '11413-4010',
        city: 'Istanbul',
        state: "Istanbul",
        country: "Turkey"
    },
]