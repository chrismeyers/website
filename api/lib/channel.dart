import 'package:aqueduct/managed_auth.dart';
import 'package:api/model/user.dart';
import './controller/controller.dart';
import 'api.dart';
import './src/api_config.dart';

/// This type initializes an application.
///
/// Override methods in this class to set up routes and initialize services like
/// database connections. See http://aqueduct.io/docs/http/channel/.
class ApiChannel extends ApplicationChannel {
  AuthServer authServer;
  ManagedContext context;
  ApiConfig config;

  /// Initialize services in this method.
  ///
  /// Implement this method to initialize services, read values from [options]
  /// and any other initialization required before constructing [entryPoint].
  ///
  /// This method is invoked prior to [entryPoint] being accessed.
  @override
  Future prepare() async {
    logger.onRecord.listen((rec) => print("$rec ${rec.error ?? ""} ${rec.stackTrace ?? ""}"));

    config = ApiConfig(options.configurationFilePath);

    final ManagedDataModel dataModel = ManagedDataModel.fromCurrentMirrorSystem();
    final PostgreSQLPersistentStore psc = PostgreSQLPersistentStore.fromConnectionInfo(
        config.database.username,
        config.database.password,
        config.database.host,
        config.database.port,
        config.database.databaseName);

    context = ManagedContext(dataModel, psc);

    final AuthServerDelegate authStorage = ManagedAuthDelegate<User>(context);
    authServer = AuthServer(authStorage);
  }

  /// Construct the request channel.
  ///
  /// Return an instance of some [Controller] that will be the initial receiver
  /// of all [Request]s.
  ///
  /// This method is invoked after [prepare].
  @override
  Controller get entryPoint {
    final Router router = Router();

    router
      .route("/auth/register")
      .link(() => RegisterController(context, authServer, config));

    router
      .route("/auth/token")
      .link(() => AuthController(authServer));

    router
      .route("/resume")
      .link(() => ResumeController());

    router
      .route("/builds/[:id]")
      .link(() => BuildsController(context));

    router
      .route("/images/[:id]")
      .link(() => ImagesController(context));

    return router;
  }
}
