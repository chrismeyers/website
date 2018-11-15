import 'package:api/api.dart';
import 'image.dart';

class Project extends ManagedObject<_Project> implements _Project {}

class _Project {
  @Column(primaryKey: true, autoincrement: true)
  int id;

  String title;

  @Column(nullable: true)
  String webUrl;

  String codeUrl;
  String date;
  String lang;
  String info;
  String role;
  String stat;

  ManagedSet<Image> images;
}
