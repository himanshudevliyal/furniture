export function PayUForm({ keyValue, transactionId, hash, form }) {
  return (
    <>
      <form action="https://test.payu.in/_payment" method="POST">
        <input type="hidden" name="key" value={keyValue} />
        <input type="hidden" name="txnid" value={transactionId} />
        <input type="hidden" name="amount" value={form?.amount} />
        <input type="hidden" name="productinfo" value={form.order_no} />
        <input type="hidden" name="firstname" value={form?.name} />
        <input type="hidden" name="email" value={form?.email} />
        <input type="hidden" name="phone" value={form?.number} />
        <input
          type="hidden"
          name="surl"
          value="http://localhost:5000/api/payu/success"
        />
        <input
          type="hidden"
          name="furl"
          value="http://localhost:5000/api/payu/failure"
        />

        <input type="hidden" name="hash" value={hash} />

        <div className="d-flex justify-content-between mt-4">
          <button type="submit">Pay Now</button>
        </div>
      </form>
    </>
  );
}
