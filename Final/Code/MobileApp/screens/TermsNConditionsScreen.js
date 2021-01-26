import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Linking,
} from "react-native";

import bg from "../assets/bg.jpg";
import { commonStyles } from "../constants/commonStyles";
import Card from "../components/Card";
const { width: WIDTH } = Dimensions.get("window");

const TermsNConditionsScreen = (props) => {
  // Purely text screen
  return (
    <ImageBackground source={bg} style={commonStyles.backgroundImageContainer}>
      <View style={styles.screen}>
        <ScrollView>
          <Card>
            <View style={styles.labelContainer}>
              <Text style={styles.label}>TERMS AND CONDITIONS </Text>
            </View>
            <Text style={styles.textB}>
              Please read all these terms and conditions.
            </Text>
            <Text style={styles.text}>
              As we can accept your order and make a legally enforceable
              agreement without further reference to you, you must read these
              terns and conditions to make sure that they contain all that you
              want and nothing that you are not happy with. If you are not sure
              about anything. just phone us on 01633012912 .
            </Text>

            <Text style={styles.section}>Application </Text>

            <Text style={styles.text}>
              1. These Terms and Conditions will apply to the purchase of the
              services and goods by you (the{" "}
              <Text style={styles.textB}>Customer</Text> or{" "}
              <Text style={styles.textB}>you</Text>). We are Group 7 trading as
              students of Cardiff University , Cardiff , CF24 3AA with email
              address PALsupport@eardiff.ac.uk telephone number 01633012912 ;
              (the <Text style={styles.textB}>Supplier</Text> or{" "}
              <Text style={styles.textB}>us</Text> or{" "}
              <Text style={styles.textB}>we</Text>).
            </Text>
            <Text style={styles.text}>
              2. These are the terms on which we sell all Services to you.
              Before placing an order on the Website, you will be asked to agree
              to these Terms and Conditions by clicking on the button marked 'I
              Accept'. If you do not click on the button, you will not be able
              to complete your Order. You can only purchase the Services and
              Goods from the Website if you are eligible to enter into a
              contract and are at least 18 years old.
            </Text>

            <Text style={styles.section}>Interpretation </Text>

            <Text style={styles.text}>
              3. <Text style={styles.textB}>Consumer</Text> means an individual
              acting for purposes which are wholly or mainly outside his or her
              trade, business, craft or profession;
            </Text>
            <Text style={styles.text}>
              4. <Text style={styles.textB}>Contract</Text> means the
              legally-binding agreement between you and us for the supply of the
              Services;
            </Text>
            <Text style={styles.text}>
              5. <Text style={styles.textB}>Delivery Location</Text> means the
              Supplier's premises or other location where the Services are to be
              supplied, as set out in the Order,
            </Text>
            <Text style={styles.text}>
              6. <Text style={styles.textB}>Durable Medium</Text> means paper or
              email, or any other medium that allows information to be addressed
              personally to the recipient, enables the recipient to store the
              information in a way accessible for future reference for a period
              that is long enough for the purposes of the information, and
              allows the unchanged reproduction of the information stored;{" "}
            </Text>
            <Text style={styles.text}>
              7. <Text style={styles.textB}>Goods</Text> means any goods that we
              supply to you with the Services, of the number and description as
              set out in the Order:
            </Text>

            <Text style={styles.text}>
              8. <Text style={styles.textB}>Order</Text> means the Customer's
              order for the Services from the Supplier as submitted following
              the step by step process set out on the Website;
            </Text>

            <Text style={styles.text}>
              9. <Text style={styles.textB}>Privacy Policy</Text> means the
              terms which set out how we will deal with confidential and
              personal information received from you via the Website;{" "}
            </Text>

            <Text style={styles.text}>
              10. <Text style={styles.textB}>Services</Text> means the services
              advertised on the Website, including any Goods, of the number and
              description set out in the Order,{" "}
            </Text>

            <Text style={styles.text}>
              11. <Text style={styles.textB}>Website</Text> means our website
              Peace And Love on which the Services are advertised.
            </Text>

            <Text style={styles.section}>Services </Text>

            <Text style={styles.text}>
              12. The description of the Services and any Goods is as set out in
              the Website, catalogues, brochures or other form of advertisement.
              Any description is for illustrative purposes only and there may be
              small discrepancies in the size and colour of any Goods supplied.
            </Text>

            <Text style={styles.text}>
              13. In the case of Services and any Goods made to your special
              requirements, it is your responsibility to ensure that any
              information or specification you provide is accurate.
            </Text>

            <Text style={styles.text}>
              14. All Services which appear on the Website are subject to
              availability.{" "}
            </Text>

            <Text style={styles.text}>
              15. We can make changes to the Services which are necessary to
              comply with any applicable law or safety requirement. We will
              notify you of these changes.
            </Text>

            <Text style={styles.section}>Customer responsibilities</Text>

            <Text style={styles.text}>
              16. You must co-operate with us in all matters relating to the
              Services , provide us and our authorised employees and
              representatives with access to any premises under your control as
              required. provide us with all information required to perform the
              Services and obtain any necessary licences and consents (unless
              otherwise agreed).
            </Text>

            <Text style={styles.text}>
              17. Failure to comply with the above is a Customer default which
              entitles us to suspend performance of the Services until you
              remedy it or if you fail to remedy it following our request, we
              can terminate the Contract with immediate effect on written notice
              to you.
            </Text>

            <Text style={styles.section}>
              Personal information and Registration
            </Text>

            <Text style={styles.text}>
              18. When registering to use the Website you must set up a username
              and password. You remain responsible for all actions taken under
              the chosen username and password and undertake not to disclose
              your username and password to anyone else and keep them secret.{" "}
            </Text>

            <Text style={styles.text}>
              19. We retain and use all information strictly under the Privacy
              Policy.
            </Text>

            <Text style={styles.text}>
              20. We may contact you by using e-mail or other electronic
              communication methods and by pre-paid post and you expressly agree
              to this.{" "}
            </Text>

            <Text style={styles.section}>Basis of Sale</Text>

            <Text style={styles.text}>
              21. The description of the Services and any Goods in our website
              does not constitute a contractual offer to sell the Services or
              Goods. When an Order has been submitted on the Website, we can
              reject it for any reason, although we will try to tell you the
              reason without delay.
            </Text>

            <Text style={styles.text}>
              22. The Order process is set out on the Website. Each step allows
              you to check and amend any errors before submitting the Order. It
              is your responsibility to check that you have used the ordering
              process correctly.
            </Text>

            <Text style={styles.text}>
              23. A Contract will be formed for the Services ordered only when
              you receive an email from us confirming the Order (
              <Text style={styles.textB}>Order Confirmation</Text>). You must
              ensure that the Order Confirmation is complete and accurate and
              inform us immediately of any errors. We are not responsible for
              any inaccuracies in the Order placed by you. By placing an Order
              you agree to us giving you confirmation of the Contract by means
              of an email with all information in it (ie the Order
              Confirmation). You will receive the Order Confirmation within a
              reasonable time after making the Contract, but in any event not
              later than the delivery of any Goods supplied under the Contract,
              and before performance begins of any of the Services.{" "}
            </Text>

            <Text style={styles.text}>
              24. Any quotation or estimate of Fees (as defined below) is valid
              fora maximum period of 7 days from its date, unless we expressly
              withdraw it at an earlier time.
            </Text>

            <Text style={styles.text}>
              25. No variation of the Contract, whether about description of the
              Services, Fees or otherwise , can be made after it has been
              entered into unless the variation is agreed by the Customer and
              the Supplier in writing.{" "}
            </Text>

            <Text style={styles.text}>
              26. We intend that these Terms and Conditions apply only to a
              Contract entered into by you as a Consumer. If this is not the
              case, you must tell us, so that we can provide you with a
              different contract with terms which are more appropriate for you
              and which might, in some respects, be trtter for you, eg by giving
              you rights as a business.{" "}
            </Text>

            <Text style={styles.textB}>Fees and Payment</Text>

            <Text style={styles.text}>
              27. The fees (<Text style={styles.textB}>Fees</Text>) for the
              Services, the price of any Goods (if not included in the Fees) and
              any additional delivery or other charges is that set out on the
              Website at the date we accept the Order or such other price as we
              may agree in writing. Prices for Services may be calculated on a
              fixed price or on a standard daily rate basis.
            </Text>

            <Text style={styles.text}>
              28. Fees and charges include VAT at the rate applicable at the
              time of the Order.
            </Text>

            <Text style={styles.text}>
              29. You must pay by submitting your credit or debit card details
              with your Order and we can take payment immediately or otherwise
              before delivery of the Services.
            </Text>

            <Text style={styles.textB}>Delivery</Text>

            <Text style={styles.text}>
              30. We will deliver the Services, including any Goods, to the
              Delivery Uration by the time or within the agreed period or,
              failing any agreement:
              {`\u000a`}
              {"\t"}a. in the case of Services, within a reasonable time; and
              {`\u000a`}
              {"\t"}b. in the case of Services, within a reasonable time; and b.
              in the case of Goods, without undue delay and, in any event, not
              more than 30 days after the day on which the Contract is entered
              into.
            </Text>

            <Text style={styles.text}>
              31. In any case, regardless of events our control, if we do not
              deliver the Services on time, you can require us to reduce the
              Fees or charges by an appropriate amount (including the right to
              receive a refund for anything already paid atx»ve the reduced
              amount). The amount of the reduction can, where appropriate, be up
              to the full anuyunt of the Fees or charges.
            </Text>

            <Text style={styles.text}>
              32. In any case, regardless of events beyond our control, if we do
              not deliver the Goods on time, you can (in addition to any other
              remedies) treat the Contract at an end if:
              {`\u000a`}
              {"\t"}a. we have refused to deliver the if delivery on time is
              essential taking into account all the relevant circumstances at
              the tine the Contract was made. or you said to us before the
              Contract was made that delivery on time essential: or
              {`\u000a`}
              {"\t"}b. after we have failed to deliver on time. you have
              specified a later period which is appropriate to the circumstances
              and we have not delivered within period.
            </Text>

            <Text style={styles.text}>
              33. If you treat the Contract at an end, we will (in addition to
              other remedies) promptly return all payments made under the
              Contract.
            </Text>

            <Text style={styles.text}>
              34. If you were entitled to treat the Contract at an end, but not
              do so, you are not prevented from cancelling the Order for any
              Goods or rejecting Goods that have been delivered and, if you do
              this, we will (in addition to other remedies) without delay return
              all payments made under the Contract for any such cancelled or
              rejected Goods. If the Goods have been delivered, you must return
              them to us or allow us to collect them from you and we will pay
              the costs of this.
            </Text>

            <Text style={styles.text}>
              35. If any Goods form a commercial unit (a unit is a comnrrcial
              unit if division of the unit would materially impair the value of
              the goods or the character of the unit) you cannot cancel or
              reject the Order for some of those Goods without also cancelling
              or rejecting the Order for the rest of them.
            </Text>

            <Text style={styles.text}>
              36. We do not generally deliver to addresses outside England and
              Wales, Scotland, Northern Ireland, the Isle of Man and Channels
              Islands. If, however, we accept an Order for delivery outside that
              area, you may need to pay import duties or other taxes, as we will
              not pay them.
            </Text>

            <Text style={styles.text}>
              37. You agree we may deliver the Goods in instalments if we suffer
              a shortage of stock or other genuine and fair reason, subject to
              the above provisions and provided you are not liable for extra
              charges.
            </Text>

            <Text style={styles.text}>
              38. If you or your nominee fail , through no fault of ours , to
              take delivery of the Services at the Delivery Location , we may
              charge the reasonable costs of storing and redelivering them.
            </Text>

            <Text style={styles.text}>
              39. The Goods will become your responsibility from the completion
              of delivery or Customer collection. You must, if reasonably
              practicable , examine the Goods before accepting them.
            </Text>

            <Text style={styles.textB}>Risk and Title</Text>

            <Text style={styles.text}>
              40. Risk of damage to, or loss of, any Goods will pass to you when
              the Goods are delivered to you.
            </Text>

            <Text style={styles.text}>
              41. You do not own the Goods until we have received payment in
              full. If full payment is overdue or a step occurs towards your
              bankruptcy, we can choose. by notice to cancel any delivery and
              end any right to use the Goods still owned by you, in which case
              you must return them or allow us to collect them.
            </Text>

            <Text style={styles.section}>Withdrawal and cancellation</Text>

            <Text style={styles.text}>
              42. You can withdraw the Order by telling us before the Contract
              is made, if you simply wish to change your mind and without giving
              us a reason, and without incurring any liability.
            </Text>

            <Text style={styles.text}>
              43. This is a <Text style={styles.textB}>distance contract</Text>{" "}
              (as defined below) which has the cancellation rights (Cancellation
              Rights) set out below. These Cancellation Rights , however, do not
              apply, to a contract for the following goods and services (with no
              others) in the following circumstances:
              {`\u000a`}
              {"\t"}a. foodstuffs, beverages or other goods intended for current
              consumption in the household and which are supplied on frequent
              and regular rounds to your residence or workplace;
              {`\u000a`}
              {"\t"}b. goods that are made to your specifications or are clearly
              personalised;
              {`\u000a`}
              {"\t"}c. goods which are liable to deteriorate or expire rapidly.
            </Text>

            <Text style={styles.textI}>Right to cancel</Text>

            <Text style={styles.text}>
              44. Subject as stated in these Terms and Conditions, you can
              cancel this contract within 14 days without grvmg any reason.
            </Text>

            <Text style={styles.text}>
              45. The cancellation period will expire after 14 days from the day
              on which you acquire, or a third party, other than the carrier,
              indicated by you, acquires physical possession of the last of the
              Goods. In a contract for the supply of services only (without
              goods), the cancellation period will expire 14 days from the day
              the Contract was entered into. In a contract for the supply of
              goods over time (ie subscriptions) , the right to cancel will be
              14 days after the first delivery.
            </Text>

            <Text style={styles.text}>
              46. To exercise the right to cancel, you must inform us of your
              decision to cancel this Contract by a clear statement setting out
              your decision (eg a letter sent by post, fax or email). You can
              use the attached model cancellation form, but it is not
              obligatory. In any event, you must be able to show clear evidence
              of when the cancellation was made, so you may decide to use the
              model cancellation form.
            </Text>

            <Text style={styles.text}>
              47. You can also electronically fill in and submit the model
              cancellation form or any other clear statement of the Customer's
              decision to cancel the Contract on our website Peace And Love . If
              you use this option, we will communicate to you an acknowledgement
              of receipt of such a cancellation in a Durable Medium (eg by
              email) without delay.
            </Text>

            <Text style={styles.text}>
              48. To meet the cancellation deadline. it is sufficient for you to
              send your communication concerning your exercise of the right to
              cancel before the cancellation period has expired.
            </Text>

            <Text style={styles.textI}>
              Commencement Of Services in the cancellation period
            </Text>

            <Text style={styles.text}>
              49. We must not begin the supply ofa service (being part of the
              Services) before the end of the cancellation period unless you
              have made an express request for the service.
            </Text>

            <Text style={styles.textI}>
              Effects of cancellation in the cancellation period
            </Text>

            <Text style={styles.text}>
              50. Except as set out below, if you cancel this Contract, we will
              reimburse to you all payments received from you, including the
              costs of delivery (except for the supplementary costs arising if
              you chose a type of delivery other than the least expensive type
              of standard delivery offered by us).
            </Text>

            <Text style={styles.textI}>
              Payment for Services commenced during the cancellation period
            </Text>

            <Text style={styles.text}>
              51. Where a service is supplied (being part of the Service) before
              the end of the cancellation period in response to your express
              request to do so, you must pay an amount for the supply of the
              service for the period for which it is supplied, ending with the
              tine when we are informed of your decision to cancel the Contract.
              This amount is in to what has tren supplied in comparison with the
              full coverage of the Contract. This anu»unt is to calculated on
              the basis of the total price agreed in the Contract or, if the
              total price were to be excessive. on the basis of the market value
              of the service that has been supplied, calculated by comparing
              prices for equivalent services supplied by other traders. You will
              bear no cost for supply of that service, in full or in part. in
              this cancellation period if that service is not supplied in
              response to such a request.
            </Text>

            <Text style={styles.textI}>Deduction for Goods supplied</Text>

            <Text style={styles.text}>
              52. We may make a deduction from the reimbursement for loss in
              value of any Goods supplied, if the loss is the result of
              unnecessary handling by you (ie handling the Goods beyond what is
              necessary to establish the nature, characteristics and functioning
              of the Goods: eg it goes beyond the sort of handling that might be
              reasonably allowed in a shop). This is because you liable for that
              loss and, if that deduction is not made, you must pay us the
              amount of that loss.
            </Text>

            <Text style={styles.textI}>Timing of reimbursement</Text>

            <Text style={styles.text}>
              53. If we have not offered to collect the Goods, we will make the
              reimbursement without undue delay, and not later than:
              {`\u000a`}
              {"\t"}a. 14 days after the day we receive back from you any Goods
              supplied, or
              {`\u000a`}
              {"\t"}b. (if earlier) 14 days after the day you provide evidence
              that you have sent back the Goods.
            </Text>

            <Text style={styles.text}>
              54. If we have offered to collect the Goods or if no Goods were
              supplied or to be supplied (ie it is a contract for the supply of
              services only), we will make the reimbursement without undue
              delay, and not later than 14 days after the day on which we are
              informed about your decision to cancel this Contract.
            </Text>

            <Text style={styles.text}>
              55. We will make the reimbursement using the same means of payment
              as you used for the initial transaction, unless you have expressly
              agreed otherwise; in any event, you will not incur any fees as a
              result of the reimbursement.
            </Text>

            <Text style={styles.textI}>Returning Goods</Text>

            <Text style={styles.text}>
              56. If you have received Goods in connection with the Contract
              which you have cancelled, you must send back the Goods or hand
              them overto us at Cardiff University , Cardiff , CF24 3AA without
              delay and in any event not later than 14 days from the day on
              which you communicate to us your cancellation of this Contract.
              The deadline is met if you send back the Goods before the period
              of 14 days has expired. You agree that you will have to bear the
              cost of retuming the Goods.
            </Text>

            <Text style={styles.text}>
              57. For the purposes of these Cancellation Rights, these words
              have the following meanings:
              {`\u000a`}
              {"\t"}a. <Text style={styles.textB}>distance contract</Text> means
              a contract concluded between a trader and a consumer under an
              organised distance sales or service-provision scheme without the
              simultaneous physical presence of the trader and the consumer,
              with the exclusive use of one or more means of distance
              communication up to and including the time at which the contrat is
              concluded;
              {`\u000a`}
              {"\t"}b. <Text style={styles.textB}>sales contract</Text> nrans a
              contract under which a trader transfers or agrees to transfer the
              ownership of goods to a consumer and the consumer pays or agrees
              to pay the price, including any contract that has both goods and
              services as its object.
            </Text>

            <Text style={styles.section}>Conformity</Text>

            <Text style={styles.text}>
              58. We have a legal duty to supply the Goods in conformity with
              the Contract, and will not have conformed if it dcrs not meet the
              following obligation.
            </Text>

            <Text style={styles.text}>
              59. Upon delivery, the Goods will:
              {`\u000a`}
              {"\t"}a. be of satisfactory quality;
              {`\u000a`}
              {"\t"}b. be reasonably fit for any particular purpose for which
              you buy the which. before the Contract is made. you made known to
              us (unless you do not actually rely. or it is unreasonable for you
              to rely, on our skill and judgment) and be fit for any purpose
              held out by us or set in the Contract; and
              {`\u000a`}
              {"\t"}c. conform to their description.
            </Text>

            <Text style={styles.text}>
              60. It is not a failure to conform if the failure has its origin
              in your materials.
            </Text>

            <Text style={styles.text}>
              61. We will supply the Services with reasonable skill and care,
            </Text>

            <Text style={styles.text}>
              62. In relation to the Services , anything we say or write to you,
              or anything someone else says or writes to you on our behalf,
              about us or about the Services , is a term of the Contract (which
              we must comply with) if you take it into account when deciding to
              enter this Contract, or when making any decision about the
              Services after entering into this Contract. Anything you take into
              account is subject to anything that qualified it and was said or
              written to you by us or on behalf of us on the same occasion, and
              any change to it that has been expressly agreed between us (before
              entering this Contract or later).
            </Text>

            <Text style={styles.section}>
              Duration, termination and suspension
            </Text>

            <Text style={styles.text}>
              63. The Contract continues as long as it takes us to perform the
              Services.
            </Text>

            <Text style={styles.text}>
              64. Either you or we may terminate the Contract or suspend the
              Services at any time by a written notice of termination or
              suspension to the other if that other:
              {`\u000a`}
              {"\t"}a. commits a serious breach, or series of breaches resulting
              in a serious breach, of the Contract and the breach either cannot
              be fixed or is not fixed within 30 days of the written notice; or
              {`\u000a`}
              {"\t"}b. is subject to any step towards its bankruptcy or
              liquidation.
            </Text>

            <Text style={styles.text}>
              65. On termination of the Contract for any reason, any of our
              respective lemaining rights and liabilities will not be affected.
            </Text>

            <Text style={styles.section}>
              Successors and our sub-contractors
            </Text>

            <Text style={styles.text}>
              66. Either party can transfer the benefit of this Contract to
              someone else, and will remain liable to the other for its
              obligations under the Contract. The Supplier will be liable for
              the acts of any sub-contractors who it chooses to help perform its
              duties.
            </Text>

            <Text style={styles.section}>
              Circumstances beyond the control of either party
            </Text>

            <Text style={styles.text}>
              67. In the event of any failure by a party because of something
              beyond its reasonable control:
              {`\u000a`}
              {"\t"}a. the party will advise the other party as soon as
              reasonably practicable: and
              {`\u000a`}
              {"\t"}b. the party's obligations will suspended so far as is
              reasonable, provided that that party will act reasonably, and the
              party will not be liable for any failure which it could not
              reasonably avoid. but this will not affect the Customer's above
              rights relating to delivery (and the right to cancel below).
            </Text>

            <Text style={styles.section}>Privacy</Text>

            <Text style={styles.text}>
              68. Your privacy is critical to us. We respect your privacy and
              comply with the General Data Protection Regulation with regard to
              your personal information.
            </Text>

            <Text style={styles.text}>
              69. These Terms and Conditions should be read alongside, and are
              in addition to our polices, including our{" "}
              <Text
                style={[styles.text, { color: "blue" }]}
                onPress={() =>
                  Linking.openURL(
                    "https://docs.google.com/document/d/17bJHkywgggpc3bx8S7dYXhTllqRPm30gzZqBmWfcH8g/edit"
                  )
                }
              >
                privacy policy
              </Text>
              and cookies policy ()
            </Text>

            <Text style={styles.text}>
              70. For the purposes of these Terms and Conditions:
              {`\u000a`}
              {"\t"}a. 'Data Protection Laws' means any applicable law relating
              to the processing of Personal Data. including , but not limited to
              the Directive 95/46/EC (Data Protection Directive) or the GDPR.
              {`\u000a`}
              {"\t"}b. 'GDPR' means the General Data Protection Regulation (EU)
              2016/679.
              {`\u000a`}
              {"\t"}c. Data Controller, 'Personal Data' and 'Processing' shall
              have the same meaning as in the GDPR.
            </Text>

            <Text style={styles.text}>
              71. We are a Data Controller of the Personal Data we Process in
              providing the Services and Goods to you.
            </Text>

            <Text style={styles.text}>
              72. Where you supply Personal Data to us so we can provide
              Services and Goods to you , and we Process that Personal Data in
              the course of providing the Services and Goods to you , we will
              comply with our obligations imposed by the Data Protection Laws:
              {`\u000a`}
              {"\t"}a. before or at the time of collecting Personal Data, we
              will identify the purposes for which information is being
              collected;
              {`\u000a`}
              {"\t"}b. we will only Process Personal Data for the purposes
              identified:
              {`\u000a`}
              {"\t"}c. we will respect your rights in relation to your Personal
              Data; and
              {`\u000a`}
              {"\t"}d. we will implement technical and organisational measures
              to ensure your Personal Data is secure.
            </Text>

            <Text style={styles.text}>
              73. For any enquiries or complaints regarding data privacy, you
              cane-mail: SudburyM@cardiff.ac.uk .
            </Text>

            <Text style={styles.section}>Excluding liability</Text>

            <Text style={styles.text}>
              74. The Supplier does not exclude liability for: (i) any
              fraudulent actoromission: or (ii) death or personal injury caused
              by negligence or breach of the Supplier's other legal obligations.
              Subject to this. we are not liable for (i) loss which was not
              reasonably foreseeable to both parties at the time when the
              Contract was made, or (ii) loss (eg loss of profit) to your
              business , trade, craft or profession which would not suffered by
              a Consumer - because we believe you are not buying the Services
              and Goods wholly or mainly for your business, trade, craft or
              profession.
            </Text>

            <Text style={styles.section}>
              Governing law, jurisdiction and complaints
            </Text>

            <Text style={styles.text}>
              75. Ihe (including any matters) is governed by the law of England
              and Wales.
            </Text>

            <Text style={styles.text}>
              76. Disputes can be submitted to the jurisdiction of the courts of
              England and Wales or, where the Customer lives in Scotland or
              Northern Ireland, in the courts of respectively Scotland or
              Northern Ireland.
            </Text>

            <Text style={styles.text}>
              77. We try to avoid any dispute, so we deal with complaints as
              follows:
              {`\u000a`}
              {"\t"}If a dispute occurs customers should contact us to find a
              solution. We will aim to respond with an appropriate solution
              within 5 working days.
            </Text>

            <Text style={styles.text}>
              We aim to follow these codes of conduct. copies of which you can
              obtain as follows: GDPR available from{" "}
              <Text
                style={[styles.text, { color: "blue" }]}
                onPress={() => Linking.openURL("https://gdpr-info.eu")}
              >
                https://gdpr-info.eu
              </Text>
            </Text>
          </Card>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

TermsNConditionsScreen.navigationOptions = {
  title: "Terms & Conditions",
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
  },
  btnContainer: {
    flexDirection: "row",
    width: "38%",
    paddingVertical: 15,
    marginVertical: 10,
  },
  text: {
    color: "rgba(255,255,255,0.7)",
    fontSize: 16,
    padding: 16,
    textAlign: "left",
  },
  textB: {
    color: "rgba(255,255,255,0.9)",
    fontWeight: "bold",
    fontSize: 16,
    padding: 15,
    textAlign: "left",
  },
  textI: {
    color: "rgba(255,255,255,0.9)",
    fontStyle: "italic",
    fontSize: 16,
    padding: 15,
    textAlign: "left",
  },
  label: {
    marginTop: 15,
    fontSize: 24,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
  section: {
    marginTop: 15,
    fontSize: 20,
    padding: 16,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
  },
  buttonSize: {
    width: "100%",
    marginHorizontal: 20,
  },
  underline: {
    textDecorationLine: "underline",
  },
});

export default TermsNConditionsScreen;
