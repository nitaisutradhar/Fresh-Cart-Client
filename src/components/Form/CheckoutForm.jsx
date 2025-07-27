import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import './checkoutForm.css'
import { useEffect, useState } from 'react'
import { ClipLoader } from 'react-spinners'
import useAuth from '@/hooks/useAuth'
import useAxiosSecure from '@/hooks/useAxiosSecure'
import { toast } from 'react-toastify'
import { DialogFooter } from '../ui/dialog'
import { Button } from '../ui/button'
import useAxios from '@/hooks/useAxios'
const CheckoutForm = ({ totalPrice, closeModal, orderData, fetchProduct }) => {
  const { user } = useAuth()
  const axiosSecure = useAxiosSecure()
  const axiosInstance = useAxios()
  const stripe = useStripe()
  const elements = useElements()
  const [cardError, setCardError] = useState(null)
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  useEffect(() => {
    const getClientSecret = async () => {
      // server request...
      const { data } = await axiosInstance.post('/create-payment-intent', {
        quantity: orderData?.quantity,
        productId: orderData?.productId,
      })
      setClientSecret(data?.clientSecret)
    }
    getClientSecret()
  }, [axiosInstance, orderData])

  const handleSubmit = async event => {
    setProcessing(true)
    // Block native form submission.
    event.preventDefault()

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement)

    if (card == null) {
      return
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card,
    })

    if (error) {
      console.log('[error]', error)
      setCardError(error.message)
      setProcessing(false)
      return
    } else {
      console.log('[PaymentMethod]', paymentMethod)
      setCardError(null)
    }
    // taka katar pala
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card,
        billing_details: {
          name: user?.displayName,
          email: user?.email,
        },
      },
    })

    if (result?.error) {
      setCardError(result?.error?.message)
      return
    }
    if (result?.paymentIntent?.status === 'succeeded') {
      // save order data in db
      orderData.transactionId = result?.paymentIntent?.id
      try {
        const { data } = await axiosSecure.post('/order', orderData)
        console.log(data)
        if (data?.insertedId) {
          toast.success('Order Placed Successfully!')
        }
        fetchProduct()
        console.log(result)
      } catch (err) {
        console.log(err)
      } finally {
        setProcessing(false)
        setCardError(null)
        closeModal()
      }
      // update product quantity in db from plant collection
    }
    console.log(result)
  }

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }}
      />
      {cardError && <p className='text-red-500 mb-6'>{cardError}</p>}
      <DialogFooter className='flex justify-between gap-2 mt-4'>
        <Button
          className='bg-green-600 hover:bg-green-700 text-white rounded cursor-pointer'
          type='submit'
          disabled={!stripe || processing}
        >
          {processing ? (
            <ClipLoader size={24} className='mt-2' />
          ) : (
            `Pay ${totalPrice}$`
          )}
        </Button>
        <Button
            variant="ghost"
          onClick={closeModal}
          className='bg-red-400 rounded cursor-pointer'
          type='button'
        >
          Cancel
        </Button>
      </DialogFooter>
    </form>
  )
}

export default CheckoutForm