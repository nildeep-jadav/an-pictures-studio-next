const clients = [
  {
    name: "Arcedior",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_ARCEDIOR%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_ARCEDIOR%20-%20LIGHT.svg"
  },
  {
    name: "Ashirvad Foundation",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_ASHIRVAD%20FOUNDATION%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_ASHIRVAD%20FOUNDATION%20-%20LIGHT.svg"
  },
  {
    name: "Audiohive",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_AUDIOHIVE%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_AUDIOHIVE%20-%20LIGHT.svg"
  },
  {
    name: "BMW",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_BMW%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_BMW-LIGHT.svg"
  },
  {
    name: "BMW Motorrad",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_BMW%20MOTORRAD%20-%20DARK-08.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_BMW%20MOTORRAD%20-%20LIGHT.svg"
  },
  {
    name: "Daffodil",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_DAFFODIL%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_DAFFODIL%20-%20LIGHT.svg"
  },
  {
    name: "Dimensions 360",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_DIMENSIONS%20360%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_DIMENSIONS%20360%20-%20LIGHT.svg"
  },
  {
    name: "Eminent Hyundai",
    logoDark: null,
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_EMINENT%20HYUNDAI%20-%20LIGHT.svg"
  },
  {
    name: "Hamleys",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_HAMLEYS%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_HAMLEYS%20-%20LIGHT.svg"
  },
  {
    name: "Kia",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_KIA%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_KIA%20-%20LIGHT.svg"
  },
  {
    name: "MG Select",
    logoDark: null,
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_MG%20SELECT%20-%20LIGHT-18.svg"
  },
  {
    name: "Mini",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_MINI%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_MINI%20-%20LIGHT.svg"
  },
  {
    name: "Vantara",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_VANTARA%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_VANTARA%20-%20LIGHT.svg"
  },
  {
    name: "WantASanta",
    logoDark: "/Essential%20Images/Brand%20Logos/Brand%20Logos_WANTASANTA%20-%20DARK.svg",
    logoLight: "/Essential%20Images/Brand%20Logos/Brand%20Logos_WANTASANTA%20-%20LIGHT.svg"
  },
];

export default function ClientLogos() {
  const renderLogo = (client: typeof clients[0]) => {
    // Case 1: Both Dark and Light logos exist (BEST)
    if (client.logoLight && client.logoDark) {
      return (
        <>
          {/* Light Mode: Use Light Logo */}
          <img
            src={client.logoLight}
            alt={`${client.name} logo`}
            className="h-8 md:h-12 w-auto object-contain dark:hidden"
          />
          {/* Dark Mode: Use Dark Logo */}
          <img
            src={client.logoDark}
            alt={`${client.name} logo`}
            className="h-8 md:h-12 w-auto object-contain hidden dark:block"
          />
        </>
      );
    }

    // Case 2: Only Light logo exists (Assume it's dark text)
    if (client.logoLight && !client.logoDark) {
      return (
        <img
          src={client.logoLight}
          alt={`${client.name} logo`}
          className="h-8 md:h-12 w-auto object-contain dark:brightness-0 dark:invert transition-all duration-300"
        />
      );
    }

    // Case 3: Only Dark logo exists (Assume it's light text)
    if (!client.logoLight && client.logoDark) {
      return (
        <img
          src={client.logoDark}
          alt={`${client.name} logo`}
          className="h-8 md:h-12 w-auto object-contain brightness-0 invert dark:brightness-100 dark:invert-0 transition-all duration-300"
        />
      );
    }

    // Fallback if no logo
    return (
      <span className="text-lg md:text-xl font-bold text-foreground">
        {client.name}
      </span>
    );
  };

  return (
    <section className="py-16 border-y border-border overflow-hidden bg-background">
      <div className="container-full">
        <p className="text-xs uppercase tracking-widest text-muted-foreground mb-12 text-center">
          Brands I've Worked With
        </p>

        <div className="relative w-full before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-20 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-20 after:bg-gradient-to-l after:from-background after:to-transparent">
          <div className="flex w-full overflow-hidden">
            <div className="flex animate-scroll whitespace-nowrap min-w-full items-center">
              {/* First set of logos */}
              {clients.map((client, index) => (
                <div
                  key={`${client.name}-${index}`}
                  className="mx-8 md:mx-12 shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  {renderLogo(client)}
                </div>
              ))}

              {/* Duplicate set for seamless loop */}
              {clients.map((client, index) => (
                <div
                  key={`${client.name}-duplicate-${index}`}
                  className="mx-8 md:mx-12 shrink-0 flex items-center justify-center grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                >
                  {renderLogo(client)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
