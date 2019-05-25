#!/usr/bin/env dart
/**
 * bootstrap.dart
 *   -m, --mode        Specifies the API that should be bootstrapped
 *                     [dev (default), prod]
 *
 *   -u, --username    Specifies the admin username (required for POST)
 *   -p, --password    Specifies the admin password (required for POST)
 *   -c, --client      Specifies the OAuth 2.0 client (required for POST)
 *   -b, --backup      Updates seed.json with current data
 *   -h, --help        Displays this help information.
 *
 * Bootstraps a database with initial data or backs up the current state of a
 * database.  The data is read from or written to seed.json, which should exist
 * in the same directory as this script.
 *
 * Examples:
 *   dart bootstrap.dart -u USER -p PASS -c SOME.CLIENT.NAME -m dev|prod
 *   ./bootstrap.dart --backup -m dev|prod
 */

import "dart:convert";
import "dart:io";
import "package:args/args.dart";
import "package:http/http.dart" as http;
import "package:path/path.dart" show dirname, join;

String apiBaseUrl;
String accessToken;
ArgResults args;

main(List<String> arguments) async {
  handleArgs(arguments);

  if(args["backup"] == true) {
    final String images = await getItems("images");
    final String builds = await getItems("builds");
    final String projects = await getItems("projects");

    const JsonDecoder decoder = JsonDecoder();
    const JsonEncoder encoder = JsonEncoder.withIndent('  ');

    final Map json = {
      "images": cleanImagesJson(decoder.convert(images) as List),
      "builds": cleanBuildsJson(decoder.convert(builds) as List),
      "projects": cleanProjectsJson(decoder.convert(projects) as List)
    };

    await File(join(dirname(Platform.script.path), "seed.json")).writeAsString(encoder.convert(json));
  }
  else {
    final String seedStr = File(join(dirname(Platform.script.path), "seed.json")).readAsStringSync();
    final seed = jsonDecode(seedStr);

    final http.Response tokenResponse = await getAccessToken();
    accessToken = jsonDecode(tokenResponse.body)["access_token"] as String;

    await postItems("images", seed["images"] as List);
    await postItems("builds", seed["builds"] as List);
    await postItems("projects", seed["projects"] as List);
  }
}

void handleArgs(List<String> arguments) {
  final ArgParser argParser = ArgParser()
    ..addOption("mode", abbr: "m", defaultsTo: "dev", allowed: ["dev", "prod"],
      help: "Specifies the API that should be bootstrapped")
    ..addOption("username", abbr: "u",
      help: "Specifies the admin username (required for POST)")
    ..addOption("password", abbr: "p",
      help: "Specifies the admin password (required for POST)")
    ..addOption("client", abbr: "c",
      help: "Specifies the OAuth 2.0 client (required for POST)")
    ..addFlag("backup", abbr: "b", negatable: false,
      help: "Updates seed.json with current data")
    ..addFlag("help", abbr: "h", negatable: false,
      help: "Displays this help information.");

  try {
    args = argParser.parse(arguments);
  }
  catch (e) {
    print(e);
    print(argParser.usage);
    exit(1);
  }

  if(args["help"] == true) {
    print(argParser.usage);
    exit(0);
  }

  if(args["backup"] == false && (args["username"] == null || args["password"] == null || args["client"] == null)) {
    print("Error: Missing auth credentials.");
    print(argParser.usage);
    exit(0);
  }

  if(args["mode"] == "dev") {
    apiBaseUrl = "http://localhost:8888";
  }
  else if(args["mode"] == "prod") {
    apiBaseUrl = "https://api.chrismeyers.info";
  }
}

Future<http.Response> getAccessToken() async {
  final body = "username=${args["username"]}&password=${args["password"]}&grant_type=password";
  final clientCredentials = Base64Encoder().convert("${args["client"]}:".codeUnits);

  return await http.post(
    "$apiBaseUrl/auth/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Authorization": "Basic $clientCredentials"
    },
    body: body);
}

void postItems(String which, List items) async {
  for(final item in items) {
    final resp = await http.post(
      "$apiBaseUrl/admin/$which",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer $accessToken"
      },
      body: jsonEncode(item));

    print("POST /admin/$which ${resp.statusCode}");
  }
}

Future<String> getItems(String which) async {
  final items = await http.get(
    "$apiBaseUrl/public/$which",
    headers: {
      "Content-Type": "application/json",
    });

  print("GET /public/$which ${items.statusCode}");
  return items.body;
}

List cleanImagesJson(List images) {
  final List cleaned = [];

  for(final image in images) {
    image.remove("id");
    image.remove("build");
    image.remove("project");
    cleaned.add(image);
  }

  return cleaned;
}

List cleanBuildsJson(List builds) {
  final List cleaned = [];

  for(final build in builds) {
    build.remove("id");
    build["image"] = build["image"]["id"];
    cleaned.add(build);
  }

  return cleaned;
}

List cleanProjectsJson(dynamic projects) {
  final List cleaned = [];

  for(final project in projects) {
    project.remove("id");
    final List imageIds = [];
    for(final image in project["images"]) {
      imageIds.add(image["id"]);
    }
    project["images"] = imageIds;
    cleaned.add(project);
  }

  return cleaned;
}
