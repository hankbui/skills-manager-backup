---
name: Swift iOS Expert
description: Expert native iOS development with Swift, SwiftUI, UIKit, Xcode, and Apple ecosystem
version: 1.0.0
---

# Swift iOS Expert Skill

## When to Use
Use when building native iOS apps with Swift, SwiftUI, UIKit, managing Xcode projects, or implementing iOS-specific features.

## Key Principles
- Write safe, idiomatic Swift code
- Follow Swift API Design Guidelines
- Use value types (struct, enum) over reference types when possible
- Leverage Swift concurrency (async/await)
- Test-driven development with XCTest
- Profile with Instruments before optimizing

## Swift Language

### Modern Swift Patterns
- Structs with immutable properties
- Enums with associated values
- Protocol-oriented programming
- Generics for reusable code
- Result builders for DSLs

### Memory Management
- Automatic Reference Counting (ARC)
- weak and unowned references
- Capture lists in closures
- @MainActor for UI updates

### Error Handling
- throws, try, catch pattern
- Custom Error types
- try? and try! usage
- Result type for async APIs

### Concurrency
- async/await syntax
- Task and TaskGroup
- Actor for thread-safe state
- @Sendable closure requirements
- Continuation for bridging callbacks

## SwiftUI

### Declarative UI
```swift
struct ContentView: View {
    @State private var count = 0
    @EnvironmentObject var viewModel: AppViewModel
    
    var body: some View {
        VStack(spacing: 20) {
            Text("Count: \(count)")
                .font(.title)
            Button("Increment") {
                count += 1
            }
        }
    }
}
```

### State Management
- @State for local view state
- @Binding for two-way binding
- @ObservedObject for external objects
- @StateObject for owned objects
- @EnvironmentObject for shared data
- @Environment for environment values
- @Published with @StateObject

### Layout
- VStack, HStack, ZStack
- LazyVStack, LazyHStack
- Grid, LazyVGrid
- Spacer, Divider
- padding, frame, alignment

### Navigation
- NavigationStack with path
- NavigationLink
- .navigationDestination
- Sheet and fullScreenCover
- TabView with tabItem

### Animation
- implicit animation
- withAnimation
- PhaseAnimator for complex animations
- KeyframeAnimator for timeline animations

### Custom Components
- ViewModifier for reusable styles
- Custom shapes with Shape protocol
- Canvas for custom drawing

## UIKit

### View Controller Lifecycle
- loadView, viewDidLoad
- viewWillAppear, viewDidAppear
- viewWillDisappear, viewDidDisappear
- viewWillLayoutSubviews, viewDidLayoutSubviews

### Auto Layout
- Programmatic constraints with NSLayoutConstraint
- Anchors API
- UIStackView for linear layouts
- Safe area layout guide

### UI Components
- UITableView with diffable data source
- UICollectionView with compositional layout
- UITextField, UITextView
- UIScrollView with content layout

### Navigation
- UINavigationController
- UITabBarController
- UIStoryboardSegue
- Programmatic navigation

## Xcode

### Project Configuration
- .xcodeproj structure
- XcodeGen for project generation
- Schemes for build configurations
- Environment variables in scheme

### Build Settings
- Debug vs Release configurations
- Custom build settings
- User-defined settings
- Build phases (Compile Sources, Link Binary)

### Dependencies
- Swift Package Manager (SPM)
- CocoaPods with Podfile
- Carthage with Cartfile
- XCFramework distribution

### Debugging
- LLDB commands (po, expr, breakpoint)
- View debugging
- Debug navigator
- Memory graph debugger

## iOS Frameworks

### Foundation
- URLSession for networking
- Codable for serialization
- UserDefaults for preferences
- NotificationCenter for pub/sub

### Combine
- Publishers and Subscribers
- @Published property wrapper
- PassthroughSubject, CurrentValueSubject
- Operators: map, filter, sink, assign

### SwiftUI + UIKit Interop
- UIViewRepresentable for UIKit views
- UIViewControllerRepresentable for UIKit VCs
- HostingController in UIKit

### Core Data
- NSManagedObjectModel
- NSPersistentContainer
- NSFetchRequest
- @FetchRequest in SwiftUI

## Architecture Patterns

### MVVM
```swift
struct UserView: View {
    @ObservedObject var viewModel: UserViewModel
    
    var body: some View {
        Text(viewModel.userName)
    }
}

class UserViewModel: ObservableObject {
    @Published var userName: String
    private let userService: UserServiceProtocol
}
```

### Clean Architecture
- Models (Entities)
- Use Cases (Business Logic)
- Repositories (Data Access)
- Presenters/ViewModels
- Views (UI)

### Coordinator Pattern
```swift
protocol Coordinator: AnyObject {
    var childCoordinators: [Coordinator] { get set }
    var navigationController: UINavigationController { get set }
    
    func start()
}

class AppCoordinator: Coordinator {
    func start() {
        let vc = HomeViewController()
        vc.coordinator = self
        navigationController.pushViewController(vc, animated: false)
    }
}
```

## Testing

### Unit Testing
```swift
import XCTest
@testable import MyApp

final class UserViewModelTests: XCTestCase {
    func testUserNameUpdate() {
        let viewModel = UserViewModel(user: User(name: "Test"))
        XCTAssertEqual(viewModel.userName, "Test")
    }
}
```

### UI Testing
```swift
import XCTest

class HomeScreenTests: XCTestCase {
    func testLoginFlow() {
        let app = XCUIApplication()
        app.launch()
        
        let usernameField = app.textFields["username"]
        usernameField.tap()
        usernameField.typeText("testuser")
        
        let loginButton = app.buttons["login"]
        loginButton.tap()
        
        XCTAssertTrue(app.staticTexts["Welcome"].waitForExistence(timeout: 5))
    }
}
```

### Test Coverage
- Arrange-Act-Assert pattern
- Mocking with protocols
- Async testing with expectation
- Performance testing with XCTMeasure

## Performance

### Instruments
- Time Profiler for CPU analysis
- Allocations for memory tracking
- Leaks for memory leaks
- Core Animation for frame rate

### Optimization Techniques
- Lazy loading of images
- Image caching with NSCache
- Pagination for large data
- Background processing with @Sendable

## App Distribution

### App Store
- App Store Connect
- TestFlight for beta testing
- App Store review guidelines
- App metadata optimization

### Code Signing
- Automatic signing in Xcode
- Manual signing with certificates
- Provisioning profiles
- Fastlane match for team sharing

### CI/CD
- Xcode Cloud
- GitHub Actions
- Fastlane for automation
- Fastlane match for certificates

## Common Patterns

### Dependency Injection
```swift
protocol NetworkServiceProtocol {
    func fetchData() async throws -> Data
}

final class NetworkService: NetworkServiceProtocol {
    func fetchData() async throws -> Data {
        // Implementation
    }
}

class ViewModel {
    private let networkService: NetworkServiceProtocol
    
    init(networkService: NetworkServiceProtocol = NetworkService()) {
        self.networkService = networkService
    }
}
```

### Async/Await Network
```swift
struct API {
    static func fetch<T: Decodable>(_ endpoint: Endpoint) async throws -> T {
        let (data, response) = try await URLSession.shared.data(for: endpoint.request)
        guard let httpResponse = response as? HTTPURLResponse,
              (200...299).contains(httpResponse.statusCode) else {
            throw APIError.invalidResponse
        }
        return try decoder.decode(T.self, from: data)
    }
}

let users: [User] = try await API.fetch(.users)
```

### Publisher Conversion
```swift
extension URLSession {
    func data(for request: URLRequest) -> AnyPublisher<(Data, URLResponse), Error> {
        dataTaskPublisher(for: request)
            .mapError { $0 as Error }
            .eraseToAnyPublisher()
    }
}
```

## Swift Best Practices

### Naming
- CamelCase for identifiers
- Descriptive method names
- Clear parameter labels
- Avoid abbreviations

### Access Control
- private for implementation details
- fileprivate for testing in same file
- internal for module-wide
- public for external access
- open for subclassing

### Memory Safety
- No retain cycles
- Proper unowned usage
- Weak references in closures
- Deinit for cleanup

### Error Handling
- Specific error types
- Recovery suggestions
- User-friendly messages
- Logging with context

## XcodeGen Configuration

### project.yml Example
```yaml
name: MyApp
options:
  bundleIdPrefix: com.myapp
  deploymentTarget:
    iOS: "16.0"
  xcodeVersion: "15.0"

settings:
  base:
    SWIFT_VERSION: "5.9"
    IPHONEOS_DEPLOYMENT_TARGET: "16.0"

targets:
  MyApp:
    type: application
    platform: iOS
    sources:
      - path: Sources
    settings:
      base:
        INFOPLIST_FILE: Sources/Info.plist
        PRODUCT_BUNDLE_IDENTIFIER: com.myapp.MyApp
        MARKETING_VERSION: "1.0.0"
        CURRENT_PROJECT_VERSION: "1"
```

## Resources

### Documentation
- Swift.org (https://swift.org/documentation/)
- Apple Developer Documentation (https://developer.apple.com/documentation/)
- Hacking with Swift (https://www.hackingwithswift.com/)

### Swift Package Index
- https://swiftpackageindex.com

### WWDC Videos
- https://developer.apple.com/videos/
