// Mock events data for Kenyan cities (Nairobi, Mombasa, Kisumu, Nakuru, Eldoret)
const mockEvents = [
    {
      id: "1",
      name: { text: "Nairobi Tech Week 2025" },
      description: { text: "The largest tech event in East Africa featuring workshops, talks, and networking with tech leaders from around the continent." },
      start: { local: "2025-05-15T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-05-17T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Sarit Centre",
        address: { city: "Nairobi", country: "Kenya", address_1: "Westlands" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Nairobi+Tech+Week" },
      category: "Technology",
      capacity: 2000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 5,000",
      organizer: { name: "Tech Kenya Association" }
    },
    {
      id: "2",
      name: { text: "Mombasa Cultural Festival" },
      description: { text: "Celebrating the rich coastal culture with traditional dances, music, crafts, and delicious Swahili cuisine." },
      start: { local: "2025-06-20T10:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-06-22T22:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Fort Jesus",
        address: { city: "Mombasa", country: "Kenya", address_1: "Old Town" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Mombasa+Cultural+Festival" },
      category: "Arts",
      capacity: 5000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Mombasa County Tourism Board" }
    },
    {
      id: "3",
      name: { text: "Nairobi International Film Festival" },
      description: { text: "Showcasing the best of African cinema with screenings, director talks, and film industry networking events." },
      start: { local: "2025-07-05T14:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-07-12T23:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Westgate Mall",
        address: { city: "Nairobi", country: "Kenya", address_1: "Westlands" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Nairobi+Film+Festival" },
      category: "Entertainment",
      capacity: 1500,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 2,500",
      organizer: { name: "Kenya Film Commission" }
    },
    {
      id: "4",
      name: { text: "Kisumu Jazz Festival" },
      description: { text: "A lakeside music festival featuring top jazz artists from Kenya and around the world." },
      start: { local: "2025-08-10T16:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-08-10T23:30:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Kisumu Impala Sanctuary",
        address: { city: "Kisumu", country: "Kenya", address_1: "Impala Avenue" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Kisumu+Jazz+Festival" },
      category: "Music",
      capacity: 1000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 3,000",
      organizer: { name: "Lakeside Music Collective" }
    },
    {
      id: "5",
      name: { text: "Nakuru Food Festival" },
      description: { text: "Taste the diversity of Kenyan cuisine with food stalls, cooking demonstrations, and eating competitions." },
      start: { local: "2025-09-25T10:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-09-27T20:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Afraha Stadium",
        address: { city: "Nakuru", country: "Kenya", address_1: "Stadium Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Nakuru+Food+Festival" },
      category: "Food",
      capacity: 3000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 500",
      organizer: { name: "Chefs Association of Kenya" }
    },
    {
      id: "6",
      name: { text: "Eldoret Marathon" },
      description: { text: "Kenya's premier running event attracting both elite athletes and amateur runners from around the world." },
      start: { local: "2025-10-12T06:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-10-12T14:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Eldoret Sports Club",
        address: { city: "Eldoret", country: "Kenya", address_1: "Uganda Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Eldoret+Marathon" },
      category: "Sports",
      capacity: 10000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,000",
      organizer: { name: "Athletics Kenya" }
    },
    {
      id: "7",
      name: { text: "Nairobi Business Expo" },
      description: { text: "Connect with entrepreneurs, investors, and business leaders from across East Africa." },
      start: { local: "2025-11-05T08:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-11-07T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "KICC",
        address: { city: "Nairobi", country: "Kenya", address_1: "City Center" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Nairobi+Business+Expo" },
      category: "Business",
      capacity: 5000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 2,000",
      organizer: { name: "Kenya Chamber of Commerce" }
    },
    {
      id: "8",
      name: { text: "Mombasa Beach Volleyball Tournament" },
      description: { text: "Professional beach volleyball competition on the beautiful shores of the Indian Ocean." },
      start: { local: "2025-12-15T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-12-16T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Nyali Beach",
        address: { city: "Mombasa", country: "Kenya", address_1: "Nyali" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Beach+Volleyball" },
      category: "Sports",
      capacity: 2000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Kenya Volleyball Federation" }
    },
    {
      id: "9",
      name: { text: "Nairobi Comedy Night" },
      description: { text: "Kenya's funniest comedians come together for a night of laughter and entertainment." },
      start: { local: "2025-04-20T19:30:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-04-20T22:30:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Carnivore Restaurant",
        address: { city: "Nairobi", country: "Kenya", address_1: "Langata Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Comedy+Night" },
      category: "Entertainment",
      capacity: 500,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,500",
      organizer: { name: "Laugh Industry" }
    },
    {
      id: "10",
      name: { text: "Kisumu Agricultural Fair" },
      description: { text: "Highlighting innovations in farming, livestock management, and agricultural technology." },
      start: { local: "2025-05-25T08:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-05-28T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "ASK Showground",
        address: { city: "Kisumu", country: "Kenya", address_1: "Mamboleo" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Agricultural+Fair" },
      category: "Business",
      capacity: 7000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 200",
      organizer: { name: "Agricultural Society of Kenya" }
    },
    
    // Additional events for all categories
    
    // More Technology events
    {
      id: "11",
      name: { text: "Nairobi Tech Summit" },
      description: { text: "Annual tech summit bringing together developers, entrepreneurs, and tech enthusiasts from across East Africa." },
      start: { local: "2025-06-15T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-06-16T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "KICC",
        address: { city: "Nairobi", country: "Kenya", address_1: "Harambee Avenue" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Tech+Summit" },
      category: "Technology",
      capacity: 3000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 3,500",
      organizer: { name: "Innovation Hub Kenya" }
    },
    {
      id: "12",
      name: { text: "Mombasa Digital Innovation Week" },
      description: { text: "A week-long event focusing on digital innovation for the coastal region's economic growth." },
      start: { local: "2025-07-10T08:30:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-07-15T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Voyager Beach Resort",
        address: { city: "Mombasa", country: "Kenya", address_1: "Nyali" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Digital+Innovation" },
      category: "Technology",
      capacity: 800,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 5,000",
      organizer: { name: "Coast Innovation Network" }
    },
    
    // More Arts events
    {
      id: "13",
      name: { text: "Nairobi Arts Festival" },
      description: { text: "Annual celebration of visual arts, featuring exhibitions from both established and emerging Kenyan artists." },
      start: { local: "2025-08-05T10:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-08-12T19:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "National Museum of Kenya",
        address: { city: "Nairobi", country: "Kenya", address_1: "Museum Hill" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Arts+Festival" },
      category: "Arts",
      capacity: 1200,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Kenya Arts Network" }
    },
    {
      id: "14",
      name: { text: "Lamu Cultural Arts Exhibition" },
      description: { text: "Showcase of traditional Swahili arts and crafts from the coastal region." },
      start: { local: "2025-09-20T09:30:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-09-27T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Lamu Fort",
        address: { city: "Lamu", country: "Kenya", address_1: "Lamu Old Town" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Lamu+Arts" },
      category: "Arts",
      capacity: 500,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 500",
      organizer: { name: "Lamu Tourism Association" }
    },
    
    // More Music events
    {
      id: "15",
      name: { text: "Nairobi International Jazz Festival" },
      description: { text: "Three-day festival featuring jazz artists from across Africa and around the world." },
      start: { local: "2025-04-18T16:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-04-21T00:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Uhuru Gardens",
        address: { city: "Nairobi", country: "Kenya", address_1: "Langata Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Jazz+Festival" },
      category: "Music",
      capacity: 5000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 4,000",
      organizer: { name: "Jazz Kenya Foundation" }
    },
    {
      id: "16",
      name: { text: "Mombasa Reggae Beach Party" },
      description: { text: "Annual reggae music celebration at the shores of the Indian Ocean." },
      start: { local: "2025-12-28T17:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-12-29T06:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Pirates Beach",
        address: { city: "Mombasa", country: "Kenya", address_1: "Mombasa South" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Reggae+Beach" },
      category: "Music",
      capacity: 3000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 2,500",
      organizer: { name: "Coastal Vibes Entertainment" }
    },
    
    // More Business events
    {
      id: "17",
      name: { text: "East African Business Summit" },
      description: { text: "Premier business conference bringing together leaders from across East Africa to discuss economic growth and regional integration." },
      start: { local: "2025-06-05T08:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-06-07T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Radisson Blu",
        address: { city: "Nairobi", country: "Kenya", address_1: "Upper Hill" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Business+Summit" },
      category: "Business",
      capacity: 800,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 15,000",
      organizer: { name: "East African Business Council" }
    },
    {
      id: "18",
      name: { text: "Startup Entrepreneurship Fair" },
      description: { text: "Exhibition and networking event for startups and entrepreneurs to connect with investors and mentors." },
      start: { local: "2025-05-20T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-05-21T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Strathmore University",
        address: { city: "Nairobi", country: "Kenya", address_1: "Madaraka Estate" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Startup+Fair" },
      category: "Business",
      capacity: 1500,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,000",
      organizer: { name: "Strathmore Business School" }
    },
    
    // More Food events
    {
      id: "19",
      name: { text: "Nairobi Restaurant Week" },
      description: { text: "Annual culinary event where top restaurants offer special menus at discounted prices." },
      start: { local: "2025-02-01T12:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-02-10T23:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Various Restaurants",
        address: { city: "Nairobi", country: "Kenya", address_1: "Various Locations" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Restaurant+Week" },
      category: "Food",
      capacity: 10000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "EatOut Kenya" }
    },
    {
      id: "20",
      name: { text: "Mombasa Seafood Festival" },
      description: { text: "Celebration of coastal cuisine featuring the best seafood from the Indian Ocean." },
      start: { local: "2025-11-14T11:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-11-16T22:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Mama Ngina Waterfront",
        address: { city: "Mombasa", country: "Kenya", address_1: "Mombasa CBD" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Seafood+Festival" },
      category: "Food",
      capacity: 5000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,500",
      organizer: { name: "Mombasa County Tourism Board" }
    },
    
    // Sports events
    {
      id: "21",
      name: { text: "Nairobi City Marathon" },
      description: { text: "Annual marathon through the streets of Nairobi attracting both professional and amateur runners." },
      start: { local: "2025-07-25T06:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-07-25T13:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Nairobi CBD",
        address: { city: "Nairobi", country: "Kenya", address_1: "City Hall Way" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=City+Marathon" },
      category: "Sports",
      capacity: 8000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 2,000",
      organizer: { name: "Athletics Kenya" }
    },
    {
      id: "22",
      name: { text: "Safari Sevens Rugby Tournament" },
      description: { text: "International rugby sevens tournament held annually in Nairobi." },
      start: { local: "2025-10-25T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-10-27T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "RFUEA Ground",
        address: { city: "Nairobi", country: "Kenya", address_1: "Ngong Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Rugby+Sevens" },
      category: "Sports",
      capacity: 6000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,500",
      organizer: { name: "Kenya Rugby Union" }
    },
    
    // Entertainment events
    {
      id: "23",
      name: { text: "Nairobi Film Festival" },
      description: { text: "Annual showcase of the best local and international films." },
      start: { local: "2025-03-10T10:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-03-17T23:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Various Cinemas",
        address: { city: "Nairobi", country: "Kenya", address_1: "Various Locations" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Film+Festival" },
      category: "Entertainment",
      capacity: 10000,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 500 per screening",
      organizer: { name: "Kenya Film Commission" }
    },
    {
      id: "24",
      name: { text: "Magical Kenya Open Stand-Up Comedy Night" },
      description: { text: "Evening of laughter featuring Kenya's top comedians." },
      start: { local: "2025-09-05T19:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-09-05T23:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Kenya National Theatre",
        address: { city: "Nairobi", country: "Kenya", address_1: "Harry Thuku Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Stand+Up+Comedy" },
      category: "Entertainment",
      capacity: 800,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 2,000",
      organizer: { name: "Laugh Industry Kenya" }
    },
    
    // Education events
    {
      id: "25",
      name: { text: "Nairobi International Book Fair" },
      description: { text: "Annual event bringing together publishers, authors, and book lovers from across East Africa." },
      start: { local: "2025-09-25T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-09-29T18:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Sarit Centre",
        address: { city: "Nairobi", country: "Kenya", address_1: "Westlands" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Book+Fair" },
      category: "Education",
      capacity: 15000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Kenya Publishers Association" }
    },
    {
      id: "26",
      name: { text: "STEM Education Conference" },
      description: { text: "Conference focused on advancing science, technology, engineering, and mathematics education in Kenya." },
      start: { local: "2025-07-15T08:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-07-17T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Kenyatta University",
        address: { city: "Nairobi", country: "Kenya", address_1: "Thika Road" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=STEM+Education" },
      category: "Education",
      capacity: 1200,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 1,000",
      organizer: { name: "Kenya Association of Science Teachers" }
    },
    
    // Health events
    {
      id: "27",
      name: { text: "Kenya Healthcare Innovation Summit" },
      description: { text: "Conference highlighting innovations in healthcare delivery and technology in Africa." },
      start: { local: "2025-05-07T08:30:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-05-09T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Kempinski Hotel",
        address: { city: "Nairobi", country: "Kenya", address_1: "Westlands" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Healthcare+Summit" },
      category: "Health",
      capacity: 800,
      url: "#",
      is_free: false,
      ticket_price: "Ksh 12,000",
      organizer: { name: "Kenya Healthcare Federation" }
    },
    {
      id: "28",
      name: { text: "Mental Health Awareness Conference" },
      description: { text: "Event focused on raising awareness about mental health issues and reducing stigma." },
      start: { local: "2025-10-10T09:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-10-10T17:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Movenpick Hotel",
        address: { city: "Nairobi", country: "Kenya", address_1: "Westlands" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Mental+Health" },
      category: "Health",
      capacity: 500,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Mental Health Kenya" }
    },
    
    // Community events
    {
      id: "29",
      name: { text: "Nairobi Community Clean-Up Day" },
      description: { text: "Volunteer event to clean up various neighborhoods in Nairobi." },
      start: { local: "2025-04-05T07:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-04-05T13:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Various Locations",
        address: { city: "Nairobi", country: "Kenya", address_1: "Various Neighborhoods" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Clean+Up+Day" },
      category: "Community",
      capacity: 5000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Nairobi County Government" }
    },
    {
      id: "30",
      name: { text: "Mombasa Cultural Heritage Festival" },
      description: { text: "Community celebration of the diverse cultural heritage of coastal Kenya." },
      start: { local: "2025-08-15T10:00:00", timezone: "Africa/Nairobi" },
      end: { local: "2025-08-17T22:00:00", timezone: "Africa/Nairobi" },
      venue: {
        name: "Mama Ngina Waterfront",
        address: { city: "Mombasa", country: "Kenya", address_1: "Mombasa CBD" }
      },
      logo: { url: "https://placehold.co/600x400/png?text=Heritage+Festival" },
      category: "Community",
      capacity: 3000,
      url: "#",
      is_free: true,
      ticket_price: "",
      organizer: { name: "Mombasa Cultural Association" }
    }
  ];
  
  // Mock categories
  const mockCategories = [
    { id: "101", name: "Technology" },
    { id: "102", name: "Arts" },
    { id: "103", name: "Music" },
    { id: "104", name: "Business" },
    { id: "105", name: "Food" },
    { id: "106", name: "Sports" },
    { id: "107", name: "Entertainment" },
    { id: "108", name: "Education" },
    { id: "109", name: "Health" },
    { id: "110", name: "Community" }
  ];
  
  // Mock cities in Kenya
  const mockCities = [
    { id: "201", name: "Nairobi" },
    { id: "202", name: "Mombasa" },
    { id: "203", name: "Kisumu" },
    { id: "204", name: "Nakuru" },
    { id: "205", name: "Eldoret" }
  ];
  
  // Function to get events by city
  export const getEventsByCity = (cityName) => {
    return mockEvents.filter(event => 
      event.venue.address.city.toLowerCase() === cityName.toLowerCase()
    );
  };
  
  export { mockEvents, mockCategories, mockCities };