import 'package:aqueduct/aqueduct.dart';
import 'package:api/api.dart';
import 'package:api/model/image.dart';

class ImagesAdminController extends ResourceController {
  ManagedContext context;

  ImagesAdminController(this.context);

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

    final int numDeleted = await query.delete();

    if(numDeleted == 0) {
      return Response.notFound(body: {"message": "image id $id does not exist"});
    }

    return Response.ok({"id": id});
  }
}