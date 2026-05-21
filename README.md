Proiect:WhisperLink
https://whisperlinkdeployfront.vercel.app/

Membrii echipei:

Frumosu Alexandru(Server + Frontend in mare parte)
Scutelniciuc Eduard(Backend in mare parte + Baza de date(postgresql))
George Mahari(rapoarte + Frontend/Backend unele parti)

Descriere:
WhisperLink este o platformă de messaging instantaneu care permite utilizatorilor să comunice în timp real, să gestioneze liste de prieteni și să trimită mesaje cu confirmare de citire. Aplicația folosește arhitectura 4-layer pentru separarea responsabilităților și SignalR pentru comunicare instant.

Arhitectura:
Backend:4-Layer Architecture (Domain, DataAccess, BusinessLayer, API)  
Frontend:React + TypeScript  
Database:PostgreSQL + DBeaver
Real-time:SignalR WebSockets  
Authentication:JWT (Access + Refresh Tokens)

Structura:
Frontend:
Frontend/
├── public/                    # Resurse statice
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── api/                   # API calls și integrare backend
│   ├── assets/                # Imagini, fonts, etc.
│   ├── components/            # Componente React reutilizabile
│   ├── hooks/                 # Custom React hooks
│   ├── mock/                  # Date mock pentru development
│   ├── pages/                 # Pagini principale (routing)
│   ├── store/                 # State management (Redux/Context)
│   ├── types/                 # TypeScript type definitions
│   ├── utils/                 # Funcții helper
│   ├── App.tsx                # Componenta principală
│   ├── index.css              # Stiluri globale
│   └── main.tsx               # Entry point
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML template
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript configuration
└── vite.config.ts             # Vite build configuration


Backend/
│
├── WhisperLink.Api/                   # 🎯 API Layer - REST Controllers + SignalR
│   ├── Controllers/
│   │   ├── EAuthController.cs         # (E) Eduard - 5 endpoints autentificare
│   │   ├── AUserController.cs         # (A) Alexandru - 5 endpoints utilizatori
│   │   ├── GFriendController.cs       # (G) George - 7 endpoints prietenii
│   │   └── EMessageController.cs      # (E) Eduard - 5 endpoints mesaje
│   ├── Hubs/
│   │   └── EChatHub.cs                # (E) Eduard - SignalR real-time
│   ├── EProgram.cs                    # (E) Eduard - Configurare aplicație
│   ├── appsettings.json               # Configurare producție
│   └── appsettings.Development.json   # Configurare development
│
├── WhisperLink.BusinessLayer/         # 💼 Business Logic Layer
│   └── Core/
│       ├── Actions/                   # Implementări logică business
│       │   ├── EAuthActions.cs        # (E) Eduard - Logică autentificare
│       │   ├── AUserActions.cs        # (A) Alexandru - Logică utilizatori
│       │   ├── GFriendActions.cs      # (G) George - Logică prietenii
│       │   └── EMessageActions.cs     # (E) Eduard - Logică mesaje
│       │
│       ├── Executions/                # Orchestrare Actions (Pattern CarWebsite)
│       │   ├── EAuthExecution.cs      # (E) Eduard - Orchestrare auth
│       │   ├── AUserExecution.cs      # (A) Alexandru - Orchestrare users
│       │   ├── GFriendExecution.cs    # (G) George - Orchestrare friends
│       │   └── AMessageExecution.cs   # (A) Alexandru - Orchestrare messages
│       │
│       ├── Helpers/                   # Utilitare și helpers
│       │   ├── EJwtTokenGenerator.cs  # (E) Eduard - Generare JWT tokens
│       │   ├── GPasswordHasher.cs     # (G) George - Hash parole BCrypt
│       │   └── AAutoMapperProfile.cs  # (A) Alexandru - Mapping Entity↔DTO
│       │
│       └── Interfaces/                # Contracte pentru Actions
│           ├── IAuthAction.cs         # Interface autentificare
│           ├── IUserAction.cs         # Interface utilizatori
│           ├── IFriendAction.cs       # Interface prietenii
│           └── IMessageAction.cs      # Interface mesaje
│
├── WhisperLink.DataAccess/            # 🗄️ Data Access Layer
│   ├── Context/
│   │   └── AppDbContext.cs            # EF Core DbContext + configurare relații
│   └── Migrations/
│       ├── 20260517242416_InitialCreate.cs       # Migrare inițială
│       └── AppDbContextModelSnapshot.cs          # Snapshot model
│
├── WhisperLink.Domain/                # 📦 Domain Layer - Entități, DTOs, Enums
│   ├── Entities/                      # Entități database (mapped cu EF Core)
│   │   ├── GBaseEntity.cs             # (G) George - Clasă bază (Id, timestamps)
│   │   ├── EUser.cs                   # (E) Eduard - Entitate utilizator
│   │   ├── AMessage.cs                # (A) Alexandru - Entitate mesaj
│   │   ├── AFriendship.cs             # (A) Alexandru - Entitate prietenie
│   │   └── GRefreshToken.cs           # (G) George - JWT refresh token
│   │
│   ├── Enums/                         # Enumerări pentru statusuri
│   │   ├── GUserRole.cs               # (G) George - Roluri (User, Admin)
│   │   ├── AMessageStatus.cs          # (A) Alexandru - Status mesaj (Sent, Delivered, Read)
│   │   └── EFriendshipStatus.cs       # (E) Eduard - Status prietenie (Pending, Accepted, Rejected, Blocked)
│   │
│   └── Models/                        # DTOs (Data Transfer Objects)
│       ├── Auth/                      # DTOs autentificare
│       │   ├── ERegisterDto.cs        # (E) Eduard - Request înregistrare
│       │   ├── ALoginDto.cs           # (A) Alexandru - Request login
│       │   ├── AAuthResponseDto.cs    # (A) Alexandru - Response cu tokens
│       │   └── GRefreshTokenDto.cs    # (G) George - Request refresh token
│       │
│       ├── Users/                     # DTOs utilizatori
│       │   ├── AUserDto.cs            # (A) Alexandru - Date user (fără parolă)
│       │   ├── GUpdateUserDto.cs      # (G) George - Request update profil
│       │   └── EChangePasswordDto.cs  # (E) Eduard - Request schimbare parolă
│       │
│       ├── Friends/                   # DTOs prietenii
│       │   ├── EFriendshipDto.cs      # (E) Eduard - Date prietenie
│       │   └── GSendFriendRequestDto.cs # (G) George - Request cerere prietenie
│       │
│       └── Messages/                  # DTOs mesaje
│           ├── AMessageDto.cs         # (A) Alexandru - Date mesaj
│           ├── GSendMessageDto.cs     # (G) George - Request trimitere mesaj
│           └── EConversationDto.cs    # (E) Eduard - Date conversație (listă chat)
│
├── .gitignore                         # Exclude bin/, obj/, .vs/, etc.
├── README.md                          # Documentație backend
└── WhisperLinkBack.sln                # Visual Studio Solution file



