import 'dart:io';

class ResumeParser {
  List<String> _lines;
  Map<String, List<String>> _rawSections;

  ResumeParser(String path) {
    _lines = File(path).readAsLinesSync();
    _rawSections = {};
    _parseLatexFile();
  }

  List<String> get lines => _lines;
  Map<String, List<String>> get rawSections => _rawSections;

  void _parseLatexFile() {
    const String beginPattern = "% BEGIN ";
    const String endPattern = "% END ";
    String section = "";

    for(String line in lines) {
      line = line.trim();
      if(line.contains(beginPattern)) { // New section
        section = line.substring(beginPattern.length);
      }
      else if(section.isNotEmpty && !line.contains(endPattern)) { // Between begin and end
        if(_rawSections.containsKey(section)) {
          _rawSections[section].add(line);
        }
        else {
          _rawSections[section] = [line];
        }
      }
      else { // Between end and begin
        section = "";
        continue;
      }
    }
  }

  List<Map<String, dynamic>> parseComplexSection(String section) {
    const String firstLinePattern = '{\\textbf{';
    const String secondLinePattern = '{\\emph{';
    const String endPattern = '}}';
    const String infoPattern = '\\item';
    const String sameCompanyPattern = '% Same Company';

    final List<Map<String, dynamic>> items = [];

    List<String> firstLine = [];
    List<List<String>> secondLine = [];
    List<List<String>> info = [];

    List<String> currentSecondLine = [];
    List<String> currentInfo = [];

    int id = -1;

    for(int i = 0; i < _rawSections[section].length; i++) {
      final String line = _rawSections[section][i].trim();

      if(line.startsWith(firstLinePattern)) {
        final int beginPatternIndex = line.indexOf(firstLinePattern) + firstLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""));

        firstLine.add(cleaned);
      }
      else if(line.startsWith(secondLinePattern)){
        final int beginPatternIndex = line.indexOf(secondLinePattern) + secondLinePattern.length;
        final int endPatternIndex = line.indexOf(endPattern);
        final String cleaned = _cleanString(line.substring(beginPatternIndex, endPatternIndex).replaceAll(endPattern, ""));

        currentSecondLine.add(cleaned);
      }
      else if(line.startsWith(sameCompanyPattern)) {
        secondLine.add(List<String>.from(currentSecondLine));
        info.add(List<String>.from(currentInfo));

        currentSecondLine = [];
        currentInfo = [];
      }
      else if(line.startsWith(infoPattern)) {
        if(i == 0) {
          continue;
        }
        else if(line.length == infoPattern.length) { // Beginning of new entry (blank $infoPattern line)
          secondLine.add(List<String>.from(currentSecondLine));
          info.add(List<String>.from(currentInfo));

          items.add({
            "id": ++id,
            "firstLine": List<String>.from(firstLine),
            "secondLine": List<List<String>>.from(secondLine),
            "info": List<List<String>>.from(info)
          });

          firstLine = [];
          secondLine = [];
          info = [];
          currentSecondLine = [];
          currentInfo = [];
        }
        else {
          final String cleaned = _cleanString(line.substring(infoPattern.length + 1));
          currentInfo.add(cleaned);
        }
      }
    }

    // The loop exits before the last item can be added. Add it here.
    secondLine.add(List<String>.from(currentSecondLine));
    info.add(List<String>.from(currentInfo));
    items.add({
      "id": ++id,
      "firstLine": List<String>.from(firstLine),
      "secondLine": List<List<String>>.from(secondLine),
      "info": List<List<String>>.from(info)
    });

    return items;
  }

  List<String> parseListSection(String section) {
    const String itemPattern = "\\item";

    final List<String> items = [];

    for(String line in _rawSections[section]) {
      if(line.startsWith(itemPattern)) {
        final String cleaned = _cleanString(line.substring(itemPattern.length + 1));
        items.add(cleaned);
      }
    }

    return items;
  }

  String _cleanString(String input) {
    String output = input.trim();

    output = output.replaceAll("\\CPP", "C++");
    output = output.replaceAll("\\break", "");
    output = output.replaceAll("--", "&ndash;");
    output = output.replaceAll("\\", "");

    return output;
  }
}
