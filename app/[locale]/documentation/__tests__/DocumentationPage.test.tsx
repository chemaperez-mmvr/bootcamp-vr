import React from "react";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DocumentationPage from "../page";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, unknown>) => {
    if (key === "modulesFound" && params?.count !== undefined) {
      return params.count === 1 ? "1 module" : `${params.count} modules`;
    }
    if (key === "noMatchModules" && params?.query !== undefined) {
      return `No modules or sections match "${params.query}".`;
    }
    if (key === "modules.0.title") return "Module 0: Basic Foundations of VR, AR, and XR";
    if (key.startsWith("modules.0.sections.")) {
      const sectionTitles: Record<string, string> = {
        whatIsVr: "What is Virtual Reality (VR)?",
        whyVrEffective: "Why is VR effective for education?",
        typesVrSetup: "Types of VR setup",
        vrUseCases: "VR use cases in the classroom",
        whatIsAr: "What is Augmented Reality (AR)?",
        arUseCases: "AR use cases in the classroom",
        whenArMakesSense: "When AR makes more sense than VR",
        whatIsXr: "What is Extended Reality (XR)?",
      };
      const k = key.replace("modules.0.sections.", "");
      return sectionTitles[k] ?? key;
    }
    const map: Record<string, string> = {
      referenceMode: "Reference mode",
      title: "Documentation",
      subtitle: "Knowledge base for VR in education.",
      sampleNote: "Sample content.",
      searchPlaceholder: "Search documentation…",
      searchLabel: "Search",
      modulesLabel: "Modules",
      categories: "Categories",
      filterAll: "All",
      vrFundamentals: "VR Fundamentals",
      hardwareSetup: "Hardware & Setup",
      pedagogicalDesign: "Pedagogical Design",
      implementation: "Implementation",
      assessment: "Assessment",
      troubleshooting: "Troubleshooting",
      safetyCompliance: "Safety & Compliance",
      noMatch: "No match",
      goToModule: "Go to module",
      includesLabel: "In this module:",
      wantGuided: "Want a guided path?",
      bootcampCta: "Start the Bootcamp.",
      startBootcamp: "Start Bootcamp",
    };
    return map[key] ?? key;
  },
  useLocale: () => "en",
}));

jest.mock("@/i18n/navigation", () => ({
  Link: ({
    children,
    href,
    ...rest
  }: {
    children: React.ReactNode;
    href: string;
  }) => (
    <a href={href} {...rest}>
      {children}
    </a>
  ),
}));

jest.mock("../../../components/Header", () => ({
  Header: () => <header data-testid="header">Header</header>,
}));

jest.mock("../../../components/Footer", () => ({
  Footer: () => <footer data-testid="footer">Footer</footer>,
}));

describe("DocumentationPage", () => {
  it("renders documentation title and search", () => {
    render(<DocumentationPage />);
    expect(screen.getByRole("heading", { name: /documentation/i })).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/search documentation/i)).toBeInTheDocument();
  });

  it("shows all modules by default", () => {
    render(<DocumentationPage />);
    expect(screen.getByText(/4 modules/)).toBeInTheDocument();
    const list = screen.getByTestId("module-list");
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBe(4);
  });

  it("filters modules when typing in search", async () => {
    const user = userEvent.setup();
    render(<DocumentationPage />);
    const search = screen.getByPlaceholderText(/search documentation/i);
    await user.type(search, "reality");
    const list = screen.getByTestId("module-list");
    expect(list).toBeInTheDocument();
    const mainList = within(list);
    expect(mainList.getByRole("heading", { name: /Module 0: Basic Foundations of VR, AR, and XR/ })).toBeInTheDocument();
    const items = mainList.getAllByRole("listitem");
    expect(items.length).toBe(1);
  });

  it("filters modules by category when selecting a category", async () => {
    const user = userEvent.setup();
    render(<DocumentationPage />);
    const filter = screen.getByRole("combobox", { name: /categories/i });
    await user.selectOptions(filter, "fundamentals");
    const list = screen.getByTestId("module-list");
    const items = within(list).getAllByRole("listitem");
    expect(items.length).toBe(1);
    expect(within(list).getByRole("heading", { name: /Module 0: Basic Foundations/ })).toBeInTheDocument();
  });

  it("shows Modules section in the sidebar", () => {
    render(<DocumentationPage />);
    expect(screen.getByText("Modules")).toBeInTheDocument();
  });

  it("renders header and footer", () => {
    render(<DocumentationPage />);
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });
});
