import { Search } from "lucide-react";
const fakeObgTicketsData = [
  {
    ticketId: "TK-2023-001",
    status: "in progress",
    description:
      "Issue with payment processing system, customer unable to complete transaction",
    date: "March 21, 2025",
    priority: "high",
    assignedTo: "Ahmed Hassan",
    customerName: "Global Trade Co.",
    customerEmail: "support@globaltrade.com",
  },
  {
    ticketId: "TK-2023-002",
    status: "done",
    description: "Request for additional user accounts with admin privileges",
    date: "March 19, 2025",
    priority: "medium",
    assignedTo: "Sara Ahmed",
    customerName: "Tech Solutions Ltd.",
    customerEmail: "admin@techsolutions.com",
  },
  {
    ticketId: "TK-2023-003",
    status: "pending",
    description: "Data migration assistance needed for new accounting software",
    date: "March 20, 2025",
    priority: "high",
    assignedTo: "Unassigned",
    customerName: "Bright Financials",
    customerEmail: "it@brightfin.com",
  },
  {
    ticketId: "TK-2023-004",
    status: "on hold",
    description:
      "Monthly financial report generation error, needs immediate assistance",
    date: "March 15, 2025",
    priority: "medium",
    assignedTo: "Mohammed Ali",
    customerName: "Desert Holdings",
    customerEmail: "finance@desertholdings.com",
  },
  {
    ticketId: "TK-2023-005",
    status: "in progress",
    description:
      "Integration request between current system and third-party API",
    date: "March 18, 2025",
    priority: "medium",
    assignedTo: "Layla Khalid",
    customerName: "Innovation Systems",
    customerEmail: "dev@innovationsys.com",
  },
  {
    ticketId: "TK-2023-006",
    status: "done",
    description: "Support needed for year-end financial statement preparation",
    date: "March 10, 2025",
    priority: "high",
    assignedTo: "Omar Saeed",
    customerName: "Gulf Industries",
    customerEmail: "accounting@gulfindustries.com",
  },
  {
    ticketId: "TK-2023-007",
    status: "pending",
    description: "Error in tax calculation for multiple invoices",
    date: "March 22, 2025",
    priority: "critical",
    assignedTo: "Unassigned",
    customerName: "Oasis Retail",
    customerEmail: "finance@oasisretail.com",
  },
  {
    ticketId: "TK-2023-008",
    status: "on hold",
    description:
      "Request to update company information in the financial system",
    date: "March 14, 2025",
    priority: "low",
    assignedTo: "Nadia Ibrahim",
    customerName: "Sunrise Media",
    customerEmail: "admin@sunrisemedia.com",
  },
  {
    ticketId: "TK-2023-009",
    status: "in progress",
    description: "Need assistance in generating financial statements for audit",
    date: "March 17, 2025",
    priority: "high",
    assignedTo: "Tariq Zaid",
    customerName: "Peninsula Construction",
    customerEmail: "finance@peninsula.com",
  },
  {
    ticketId: "TK-2023-010",
    status: "done",
    description: "User permission issues preventing access to reports",
    date: "March 12, 2025",
    priority: "medium",
    assignedTo: "Huda Faisal",
    customerName: "Unity Education",
    customerEmail: "it@unityedu.com",
  },
  {
    ticketId: "TK-2023-011",
    status: "pending",
    description: "Request for custom financial dashboard development",
    date: "March 21, 2025",
    priority: "low",
    assignedTo: "Unassigned",
    customerName: "Crown Investments",
    customerEmail: "management@crowninvest.com",
  },
  {
    ticketId: "TK-2023-012",
    status: "in progress",
    description: "Discrepancy in monthly balance sheet calculations",
    date: "March 19, 2025",
    priority: "critical",
    assignedTo: "Karim Jamal",
    customerName: "Blue Ocean Trading",
    customerEmail: "accounts@blueocean.com",
  },
  {
    ticketId: "TK-2023-013",
    status: "on hold",
    description: "Assistance needed with multi-currency transaction reporting",
    date: "March 16, 2025",
    priority: "medium",
    assignedTo: "Leila Mansour",
    customerName: "Global Exchange Co.",
    customerEmail: "treasury@globalex.com",
  },
  {
    ticketId: "TK-2023-014",
    status: "done",
    description: "Employee payroll integration failing after system update",
    date: "March 11, 2025",
    priority: "high",
    assignedTo: "Samir Nasser",
    customerName: "Horizon HR Services",
    customerEmail: "payroll@horizonhr.com",
  },
  {
    ticketId: "TK-2023-015",
    status: "in progress",
    description:
      "Automated invoice generation system error for recurring billings",
    date: "March 20, 2025",
    priority: "high",
    assignedTo: "Fatima Rashid",
    customerName: "Digital Solutions Inc.",
    customerEmail: "billing@digitalsolutions.com",
  },
  {
    ticketId: "TK-2023-016",
    status: "pending",
    description: "Assistance needed to set up new department cost centers",
    date: "March 18, 2025",
    priority: "medium",
    assignedTo: "Unassigned",
    customerName: "Crescent Manufacturing",
    customerEmail: "finance@crescentmfg.com",
  },
  {
    ticketId: "TK-2023-017",
    status: "done",
    description: "Request for financial compliance reporting templates",
    date: "March 13, 2025",
    priority: "low",
    assignedTo: "Yasmin Hamad",
    customerName: "Regulatory Advisors",
    customerEmail: "compliance@regulatoryadv.com",
  },
];
function ObjTicket() {
  function handleSearch() {
    console.log("search");
  }
  return (
    <main className="flex-1 overflow-y-auto h-full">
      <div className="mx-auto max-w-4xl p-6 md:p-8 lg:p-10">
        <div className="mb-4">
          <span className="mb-2 inline-block rounded-full bg-apple-blueMedium px-3 py-1 text-xs font-medium text-apple-text">
            Tickets Dashboard
          </span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
            Current Tickets
          </h1>
          <p className="mt-2 text-slate-600">
            Overview of your open support tickets and customer requests
          </p>
        </div>
        <>
          <div className="w-full ">
            <form className="lg:block mb-[2rem]">
              <div className="relative">
                <input
                  className="w-[99%] py-3 px-2  pl-10 rounded-full border text-sm text-black"
                  placeholder="Search for a ticket"
                />
                <button
                  className="absolute top-1.5 right-3 flex items-center rounded-full bg-[rgba(91,184,255,1)] py-2.5 px-4 border border-transparent text-center text-sm text-white transition-all shadow-sm hover:shadow focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                  type="button"
                  onClick={handleSearch}
                >
                  <Search className=" mr-2 w-4 h-4 text-white" />
                  Search
                </button>
              </div>
            </form>
          </div>
        </>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {fakeObgTicketsData.map((ticket, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="p-6">
                {/* Header section with ticket ID and date */}
                <div className="flex justify-between items-center mb-4">
                  <span className="px-3 py-1.5 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {ticket.ticketId}
                  </span>
                  <span className="text-xs text-slate-500">{ticket.date}</span>
                </div>

                {/* Priority & Status indicators */}
                <div className="flex justify-between mb-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
                      ticket.status === "in progress"
                        ? "bg-yellow-100 text-yellow-800"
                        : ticket.status === "done"
                        ? "bg-green-100 text-green-800"
                        : ticket.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : ticket.status === "on hold"
                        ? "bg-gray-100 text-gray-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <span
                      className={`mr-1.5 w-2 h-2 rounded-full ${
                        ticket.status === "in progress"
                          ? "bg-yellow-500"
                          : ticket.status === "done"
                          ? "bg-green-500"
                          : ticket.status === "pending"
                          ? "bg-orange-500"
                          : ticket.status === "on hold"
                          ? "bg-gray-500"
                          : "bg-gray-500"
                      }`}
                    ></span>
                    {ticket.status || "Not assigned"}
                  </span>

                  {/* <span
                    className={`inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-full ${
                      ticket.priority === "critical"
                        ? "bg-red-100 text-red-800"
                        : ticket.priority === "high"
                        ? "bg-orange-100 text-orange-800"
                        : ticket.priority === "medium"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    Priority: {ticket.priority || "low"}
                  </span> */}
                  {/* should i include priority? */}
                </div>

                {/* Customer info */}
                {/* <div className="mb-3 bg-slate-50 p-2 rounded-md text-xs">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold w-24">Customer:</span>
                    <span className="text-slate-700">
                      {ticket.customerName || "Unknown"}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <span className="font-semibold w-24">Contact:</span>
                    <span className="text-slate-700">
                      {ticket.customerEmail || "No email provided"}
                    </span>
                  </div>
                </div> */}
                {/* should i include customer's info? */}

                {/* Ticket title and description */}
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  Ticket Details
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 mb-4 leading-relaxed">
                  {ticket.description}
                </p>

                {/* Assignment info */}
                <div className="mb-4 mt-3 flex items-center">
                  <span className="text-xs font-medium text-slate-500 mr-2">
                    Assigned to:
                  </span>
                  <span
                    className={`text-xs font-semibold ${
                      ticket.assignedTo === "Unassigned"
                        ? "text-orange-600"
                        : "text-slate-700"
                    }`}
                  >
                    {ticket.assignedTo}
                  </span>
                </div>

                {/* Action buttons */}
                <div className="mt-4 flex justify-end space-x-3">
                  <button className="inline-flex items-center justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-apple-blue border border-apple-blue shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-200">
                    Respond
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md bg-apple-blue px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-apple-blue/90 focus:outline-none focus:ring-2 focus:ring-apple-blue/50 transition-all duration-200">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default ObjTicket;
