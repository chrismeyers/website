import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/build.dart';
import 'package:api/model/image.dart';

class BuildController extends ResourceController {
  ManagedContext context;

  BuildController(this.context);

  @Operation.get()
  Future<Response> getBuilds() async {
    final Query<Build> query = Query<Build>(context)
      ..join(object: (b) => b.image);
    final List<Build> allBuilds = await query.fetch();

    return Response.ok(allBuilds);
  }

  @Operation.get("id")
  Future<Response> getBuild(@Bind.path("id") int id) async {
    final Query<Build> query = Query<Build>(context)
      ..where((b) => b.id).equalTo(id)
      ..join(object: (b) => b.image);
    final Build build = await query.fetchOne();

    return Response.ok(build);
  }

  @Operation.post()
  Future<Response> addBuild() async {
    final Map<String, dynamic> body = await request.body.decode();
    final int imageId = body["image"]["id"] as int;

    final Build build = await context.transaction((transaction) async {
      final Query<Build> queryAddData = Query<Build>(transaction)
        ..values.date = body["date"] as String
        ..values.cpu = body["cpu"] as String
        ..values.cool = (body["cool"] == null) ? null : body["cool"] as String
        ..values.mobo = body["mobo"] as String
        ..values.ram = body["ram"] as String
        ..values.hdd = body["hdd"] as String
        ..values.ssd = (body["ssd"] == null) ? null : body["ssd"] as String
        ..values.gpu = body["gpu"] as String;
      final Build build = await queryAddData.insert();

      final Query<Image> queryRelateImage = Query<Image>(transaction)
        ..where((i) => i.id).equalTo(imageId)
        ..values.build.id = build.id;
      await queryRelateImage.updateOne();

      final Query<Build> complete = Query<Build>(transaction)
        ..where((b) => b.id).equalTo(build.id)
        ..join(object: (b) => b.image);

      return await complete.fetchOne();
    });

    return Response.ok(build);
  }

  @Operation.put("id")
  Future<Response> updateBuild(@Bind.path("id") int id) async {
    final Map<String, dynamic> body = await request.body.decode();
    final int imageId = body["image"]["id"] as int;

    final build = await context.transaction((transaction) async {
      final Query<Build> queryUpdateData = Query<Build>(transaction)
        ..values.date = body["date"] as String
        ..values.cpu = body["cpu"] as String
        ..values.cool = body["cool"] as String
        ..values.mobo = body["mobo"] as String
        ..values.ram = body["ram"] as String
        ..values.hdd = body["hdd"] as String
        ..values.ssd = body["ssd"] as String
        ..values.gpu = body["gpu"] as String
        ..where((b) => b.id).equalTo(id);
      final Build build = await queryUpdateData.updateOne();

      // Get the image that was originally related to this build and nullify
      // the relationship.
      final Query<Image> queryOrigImage = Query<Image>(transaction)
        ..where((i) => i.build.id).equalTo(build.id)
        ..values.build.id = null;
      await queryOrigImage.updateOne();

      // Set the new relation.
      final Query<Image> queryRelateImage = Query<Image>(transaction)
        ..where((i) => i.id).equalTo(imageId)
        ..values.build.id = build.id;
      await queryRelateImage.updateOne();

      final Query<Build> complete = Query<Build>(transaction)
        ..where((b) => b.id).equalTo(build.id)
        ..join(object: (b) => b.image);

      return await complete.fetchOne();
    });

    return Response.ok(build);
  }

  @Operation.delete("id")
  Future<Response> deleteBuild(@Bind.path("id") int id) async {
    final Query<Build> query = Query<Build>(context)
      ..where((b) => b.id).equalTo(id);

    await query.delete();

    return Response.ok({"id": id});
  }
}
