import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/image.dart';

class ImageController extends ResourceController {
  ManagedContext context;

  ImageController(this.context);

  @Operation.get()
  Future<Response> getImages() async {
    final Query<Image> query = Query<Image>(context);
    final List<Image> allImages = await query.fetch();

    return Response.ok(allImages);
  }

  @Operation.get("id")
  Future<Response> getImage(@Bind.path("id") int id) async {
    final Query<Image> query = Query<Image>(context)
      ..where((i) => i.id).equalTo(id);

    final Image image = await query.fetchOne();

    return Response.ok(image);
  }

  @Operation.post()
  Future<Response> addImage() async {
    final Map<String, dynamic> body = await request.body.decode();
    final Query<Image> query = Query<Image>(context)
      ..values.path = body["path"] as String
      ..values.title = body["title"] as String
      ..values.orient = body["orient"] as String;

    final Image image = await query.insert();

    return Response.ok(image);
  }

  @Operation.put("id")
  Future<Response> updateImage(@Bind.path("id") int id) async {
    final Map<String, dynamic> body = await request.body.decode();
    final Query<Image> query = Query<Image>(context)
      ..values.path = body["path"] as String
      ..values.title = body["title"] as String
      ..values.orient = body["orient"] as String
      ..where((i) => i.id).equalTo(id);

    final Image image = await query.updateOne();

    return Response.ok(image);
  }

  @Operation.delete("id")
  Future<Response> deleteImage(@Bind.path("id") int id) async {
    final Query<Image> query = Query<Image>(context)
      ..where((i) => i.id).equalTo(id);

    await query.delete();

    return Response.ok({"id": id});
  }
}
