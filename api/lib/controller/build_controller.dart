import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/build.dart';

class BuildController extends ResourceController {
  ManagedContext context;

  BuildController(this.context);

  @Operation.get()
  Future<Response> getBuilds() async {

  }

  @Operation.post()
  Future<Response> addBuild() async {

  }
}
