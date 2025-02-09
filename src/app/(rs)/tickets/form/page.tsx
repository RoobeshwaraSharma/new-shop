import { Backbutton } from "@/components/BackButton";
import { getCustomer } from "@/lib/quaries/getCustomer";
import { getTicket } from "@/lib/quaries/getTicket";

export default async function TicketFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    const { customerId, ticketId } = await searchParams;

    if (!customerId && !ticketId) {
      return (
        <>
          <h2 className="text-2xl mb-2">
            Ticket ID or Customer ID required to load ticket form
          </h2>
          <Backbutton title="Go Back" variant="default" />
        </>
      );
    }

    //New Ticket form
    if (customerId) {
      const customer = await getCustomer(parseInt(customerId));
      if (!customer) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer Id #{customerId} not found
            </h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      if (!customer.active) {
        return (
          <>
            <h2 className="text-2xl mb-2">
              Customer Id #{customerId} is not active
            </h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      //Return ticket form
      console.log(customer);
    }
    //Edit ticket form
    if (ticketId) {
      const ticket = await getTicket(parseInt(ticketId));
      if (!ticket) {
        return (
          <>
            <h2 className="text-2xl mb-2">Ticket Id #{ticketId} not found</h2>
            <Backbutton title="Go Back" variant="default" />
          </>
        );
      }
      const customer = await getCustomer(ticket.customerId);
      // return ticket form
      console.log("ticket", ticket);
      console.log("customer", customer);
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
