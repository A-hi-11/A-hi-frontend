import React, { useEffect, useRef, useState} from "react";
import { useParams } from "react-router-dom";
import { loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";
import axios from "axios";

const selector = "#payment-widget";

const widgetClientKey = process.env.REACT_APP_TOSS_CLIENT_KEY;
const customerKey = nanoid();

export function CheckoutPage() {
  const [paymentWidget, setPaymentWidget] = useState(null);
  const paymentMethodsWidgetRef = useRef(null);
  const price = 1000;
  const storedJwtToken = localStorage.getItem("jwtToken");
  const { prompt_id } = useParams();
  const storedMemberId = localStorage.getItem("memberId");
  const storedNickname = localStorage.getItem("nickname");

  useEffect(() => {
    const fetchPaymentWidget = async () => {
      try {
        const loadedWidget = await loadPaymentWidget(
          widgetClientKey,
          customerKey
        );
        setPaymentWidget(loadedWidget);
      } catch (error) {
        console.error("Error fetching payment widget:", error);
      }
    };

    fetchPaymentWidget();
  }, []);

  useEffect(() => {
    if (paymentWidget == null) {
      return;
    }

    const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
      selector,
      { value: price },
      { variantKey: "DEFAULT" }
    );

    paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

    paymentMethodsWidgetRef.current = paymentMethodsWidget;
  }, [paymentWidget, price]);

  useEffect(() => {
    const paymentMethodsWidget = paymentMethodsWidgetRef.current;

    if (paymentMethodsWidget == null) {
      return;
    }

    paymentMethodsWidget.updateAmount(price);
  }, [price]);

  const handlePaymentRequest = async () => {
    const orderId = nanoid()
    await axios.post('/payment/save',{
        orderId: orderId,
        amount : price,
    },{
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + storedJwtToken,
        },
      })

    try {
      await paymentWidget?.requestPayment({
        orderId: orderId,
        orderName: prompt_id,
        customerName: storedNickname,
        customerEmail: storedMemberId,
        successUrl: `${window.location.origin}/promptdetail/${prompt_id}`,
        failUrl: `${window.location.origin}/promptdetail/${prompt_id}`,
      });
    } catch (error) {
      console.error("Error requesting payment:", error);
    }
  };

  return (
    <div className="wrapper">
      <div className="box_section">
        {/* 결제 UI, 이용약관 UI 영역 */}
        <div id="payment-widget" />
        <div id="agreement" />
        <div style={{ paddingLeft: "24px" }}>
          {/* 할인 쿠폰 */}
          <div className="checkable typography--p">
            <label
              htmlFor="coupon-box"
              className="checkable__label typography--regular"
            >
              
            </label>
          </div>
        </div>
        <div className="result wrapper">
          {/* 결제하기 버튼 */}
          <button
            className="button"
            style={{ marginTop: "30px" }}
            onClick={handlePaymentRequest}
          >
            결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
