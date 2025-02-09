import { Backbutton } from "@/components/BackButton";
import { getCustomer } from "@/lib/quaries/getCustomer";

export default async function CustomerFormPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  try {
    // customers/form/
    const { customerId } = await searchParams;
    //Edit customer form

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
      console.log(customer);
      //Put customer form component
    } else {
      // new customer form component
    }
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
}
