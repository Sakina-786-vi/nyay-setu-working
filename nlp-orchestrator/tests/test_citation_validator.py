import json
from pathlib import Path

from validators.citation_validator import validate_citation


def test_bns_bnss_section_ranges():
    data_path = (
    Path(__file__).resolve().parent.parent / "data" / "legal_sections.json"
)

    with open(data_path, "r", encoding="utf-8") as f:
        data = json.load(f)

    assert data["acts"]["BNS"]["section_range"] == [1, 358]
    assert data["acts"]["BNSS"]["section_range"] == [1, 531]


def test_valid_bns_sections():
    assert validate_citation("BNS Section 302") is True
    assert validate_citation("BNS Section 350") is True


def test_valid_bnss_sections():
    assert validate_citation("BNSS Section 482") is True
    assert validate_citation("BNSS Section 531") is True


def test_invalid_sections():
    assert validate_citation("BNS Section 999") is False
    assert validate_citation("BNSS Section 999") is False