import type { FlowNode } from "./types";

export const emergencyNodes: FlowNode[] = [
  {
    id: "emergency",
    topic: "emergency",
    title: "Outages & emergencies",
    say: "If anyone is in danger or needs medical help, call triple zero now. Otherwise, tell me what's happening.",
    card: { kind: "emergency" },
    options: [
      { label: "My power is out", next: "emergency.power" },
      { label: "I can smell gas", next: "emergency.gas" },
      { label: "Life support equipment", next: "emergency.lifesupport" },
      { label: "No hot water", next: "emergency.hotwater" },
      { label: "Internet or mobile outage", next: "internet.outage" },
    ],
    keywords: ["emergency", "outage", "blackout", "danger", "storm", "urgent"],
  },
  {
    id: "emergency.power",
    topic: "emergency",
    title: "Power outage",
    say: "Sorry your power's out. {distributor} is reporting an unplanned outage affecting parts of Newtown, with power expected back by 4:30 this afternoon. First, check your fuse box in case a safety switch has tripped.",
    card: { kind: "outage-status", service: "power" },
    options: [
      { label: "Neighbours are out too", next: "emergency.power.distributor" },
      { label: "It's just my house", next: "emergency.power.house" },
      { label: "I rely on life support", next: "emergency.lifesupport" },
    ],
    keywords: ["power out", "power is out", "no power", "blackout", "power cut", "electricity out", "lights out"],
  },
  {
    id: "emergency.power.distributor",
    topic: "emergency",
    title: "Area outage",
    say: "It sounds like the {distributor} outage. They manage the poles and wires, so they'll restore power. I'll text you updates, or you can call {distributor} on {distributorPhone}.",
    card: {
      kind: "contact",
      title: "Faults and emergencies",
      entries: [
        { label: "{distributor} (electricity)", phone: "{distributorPhone}", note: "24/7 faults line" },
        { label: "Emergency services", phone: "000" },
      ],
    },
    options: [
      { label: "Text me updates", next: "emergency.power.sms" },
      { label: "Thanks", next: "resolved" },
    ],
  },
  {
    id: "emergency.power.sms",
    topic: "emergency",
    title: "Outage alerts",
    say: "Done. We'll text {mobileNumber} when {distributor} updates the restoration time.",
    card: { kind: "success", title: "Outage alerts on", detail: "SMS to {mobileNumber}" },
    options: [{ label: "Thanks", next: "resolved" }],
  },
  {
    id: "emergency.power.house",
    topic: "emergency",
    title: "Just my house",
    say: "If it's only your home, the main switch or a safety switch has probably tripped. Try turning it back on. If it trips again, an appliance may be faulty, so unplug everything and switch appliances back on one at a time.",
    card: {
      kind: "steps",
      title: "Check your fuse box",
      steps: [
        "Find your switchboard, often near the meter",
        "Look for a switch in the 'off' position and switch it on",
        "If it trips again, unplug all appliances and reset",
        "Still no power? Call an electrician or {distributor} on {distributorPhone}",
      ],
    },
    options: [
      { label: "Power's back on", next: "resolved" },
      { label: "Still no power", next: "emergency.power.distributor" },
    ],
  },
  {
    id: "emergency.gas",
    topic: "emergency",
    title: "Gas leak",
    say: "Please act now. If the smell is strong or anyone feels unwell, leave the house and call triple zero. If it's safe, turn off the gas at the meter, open the windows, and don't use switches or flames. Then call {gasDistributor} on {gasDistributorPhone} from outside.",
    card: {
      kind: "contact",
      title: "Gas emergency",
      entries: [
        { label: "Emergency services", phone: "000", note: "If there's any danger" },
        { label: "{gasDistributor}", phone: "{gasDistributorPhone}", note: "24/7 gas faults" },
      ],
    },
    options: [
      { label: "I'm safe, what next?", next: "emergency.gas.next" },
      { label: "Talk to a person", next: "handoff" },
    ],
    keywords: ["smell gas", "gas leak", "gas smell", "leaking gas", "smells like gas"],
  },
  {
    id: "emergency.gas.next",
    topic: "emergency",
    title: "After a gas leak",
    say: "Good. Once {gasDistributor} has made it safe, a licensed gas fitter will need to check your appliances before you turn the gas back on. If you're renting, let your agent know.",
    card: {
      kind: "steps",
      title: "Next steps",
      steps: ["Wait for the distributor to make the meter safe", "Book a licensed gas fitter", "Tell your real estate agent if renting", "Contact us if your gas was disconnected"],
    },
    options: [{ label: "Thanks", next: "resolved" }],
  },
  {
    id: "emergency.lifesupport",
    topic: "emergency",
    title: "Life support",
    say: "If you rely on life support equipment and the power is out, follow your action plan and call triple zero if there's any risk to health. You can call us any time on 131 245. Would you like to register equipment at your address?",
    card: {
      kind: "contact",
      title: "Life support",
      entries: [
        { label: "Emergency services", phone: "000" },
        { label: "AGL life support (24/7)", phone: "131 245" },
      ],
    },
    options: [
      { label: "Register life support equipment", next: "handoff" },
      { label: "I'm already registered", next: "resolved" },
    ],
    keywords: ["life support", "oxygen", "dialysis", "medical equipment"],
  },
  {
    id: "emergency.hotwater",
    topic: "emergency",
    title: "No hot water",
    say: "Let's check a few things. Is your hot water system gas or electric?",
    options: [
      { label: "Electric", next: "emergency.hotwater.electric" },
      { label: "Gas", next: "emergency.hotwater.gas" },
    ],
    keywords: ["hot water", "no hot water", "cold shower", "water heater"],
  },
  {
    id: "emergency.hotwater.electric",
    topic: "emergency",
    title: "Electric hot water",
    say: "Electric systems often run on a controlled load that only heats overnight. Check the hot water switch in your fuse box is on. If you had a power outage, call {distributor} as the timer may need resetting.",
    card: {
      kind: "steps",
      title: "Electric hot water checks",
      steps: ["Check the 'hot water' switch in the fuse box", "Wait until the next morning if it heats off-peak", "After an outage, call {distributor} on {distributorPhone}"],
    },
    options: [
      { label: "Fixed", next: "resolved" },
      { label: "Still cold", next: "handoff" },
    ],
  },
  {
    id: "emergency.hotwater.gas",
    topic: "emergency",
    title: "Gas hot water",
    say: "For gas systems, check the pilot light is on and your other gas appliances are working. If nothing has gas, there may be a supply issue, and I can check that for you.",
    card: {
      kind: "steps",
      title: "Gas hot water checks",
      steps: ["Check the pilot light (follow the instructions on the unit)", "Test your gas stove", "No gas anywhere? Your supply may be interrupted"],
    },
    options: [
      { label: "No gas anywhere", next: "handoff" },
      { label: "Fixed", next: "resolved" },
    ],
  },
];
